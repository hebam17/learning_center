const {
  GraphQLString,
  GraphQLError,
  GraphQLEnumType,
  GraphQLID,
} = require("graphql");
const { validation } = require("../utils/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

const {
  RegisterInputType,
  RegisterSuccessType,
  TokenType,
  MessageType,
  RegisterVerificationInputType,
  UserType,
} = require("./Types");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { createToken, createAccessToken } = require("../utils/createToken");
const { errorHandler, idCheck } = require("../utils/errorHandler");
// const { SendVerificationEmail } = require("../mail/emails");

const queryFields = {
  refresh: {
    type: TokenType,

    async resolve(parent, args, { req, res }) {
      try {
        const cookies = req.raw.cookies;
        if (!cookies?.token)
          throw new GraphQLError("You are unauthorized", {
            extensions: {
              http: { status: 401 },
            },
          });

        const refreshToken = cookies.token;

        const userData = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        const user = userData.roles.includes("Student")
          ? await Student.findById(userData.userId)
          : await Teacher.findById(userData.userId);

        if (user) {
          const type = userData.roles.includes("Student")
            ? "Student"
            : "Teacher";

          const { accessToken } = createAccessToken(user, type);
          return { accessToken };
        }

        throw new GraphQLError("You are unauthorized", {
          extensions: {
            code: "FORBIDDEN",
            http: { status: 403 },
          },
        });
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

const mutationFields = {
  register: {
    type: RegisterSuccessType,
    args: {
      // firstname: { type: GraphQLString },
      // lastname: { type: GraphQLString },
      // email: { type: GraphQLString },
      // password: { type: GraphQLString },

      // type: {
      //   type: new GraphQLEnumType({
      //     name: "registerType",
      //     values: {
      //       student: { value: "Student" },
      //       teacher: { value: "Teacher" },
      //     },
      //   }),
      // },

      input: { type: RegisterInputType },
    },
    async resolve(parent, { input }) {
      console.log("Register!!!");
      try {
        const errors = validation(Object.entries(input));
        const isValid = Object.keys(errors)?.length === 0;
        // console.log("errors:", errors);
        // console.log("isValid:", isValid);
        if (!isValid) {
          throw new GraphQLError(Object.values(errors), {
            extensions: {
              code: "BAD REQUEST",
              http: { status: 400 },
            },
          });
        }

        const isTeacher = input.type === "Teacher";
        // console.log("isTeacher:", isTeacher);

        let existingUser;
        if (isTeacher) {
          existingUser = await Teacher.findOne({ email: input.email });
        } else if (!isTeacher) {
          existingUser = await Student.findOne({ email: input.email });
        }
        // console.log("existingUser:", existingUser);

        if (existingUser) {
          throw new GraphQLError("This user is already exist", {
            extensions: {
              http: { status: 400 },
            },
          });
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        // Create the verification token
        const verificationToken = otpGenerator.generate(6, {
          specialChars: false,
        });
        console.log("verificationToken:", verificationToken);
        console.log("typeof verificationToken:", typeof verificationToken);

        let newUser;
        if (isTeacher) {
          newUser = await Teacher.create({
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            password: hashedPassword,
            verificationEmailToken: verificationToken,
            verificationEmailExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
          });
        } else {
          newUser = await Student.create({
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            password: hashedPassword,
            verificationEmailToken: verificationToken,
            verificationEmailExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
          });

          console.log("newUser:", newUser);
        }

        // sending a verification email - uncomment this and change settings in the "../mail/emails" file to send verification email
        // SendVerificationEmail(
        //   (userEmail = input.email),
        //   (username = input.firstname),
        //   (subject = "Email verification"),
        //   (verificationToken)
        // );

        return { message: "Registered successfully!", userId: newUser._id };
      } catch (err) {
        console.log(err);

        errorHandler(err);
      }
    },
  },

  registerVerification: {
    type: TokenType,
    args: {
      input: { type: RegisterVerificationInputType },
    },
    async resolve(parent, { input }, { req, res }) {
      try {
        idCheck(input.userId);

        // get whether it's a student or a teacher
        const type = input.type;

        let verifiedUser;
        if (type === "Teacher") {
          verifiedUser = await Teacher.findOne({
            _id: input.userId,
            verificationEmailToken: input.code,
            verificationEmailExpiresAt: { $gt: Date.now() },
          });
        } else if (type === "Student") {
          verifiedUser = await Student.findOne({
            _id: input.userId,
            verificationEmailToken: input.code,
            verificationEmailExpiresAt: { $gt: Date.now() },
          });
        }
        if (!verifiedUser)
          throw new GraphQLError("Sorry,this user couldn't be found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });

        if (verifiedUser.isActive === true)
          throw new GraphQLError("You are already verified, you can login", {
            extensions: {
              code: "BAD REQUEST",
              http: { status: 400 },
            },
          });

        const { accessToken, refreshToken } = createToken(
          verifiedUser,
          input.type
        );
        // set the http only cookie to send the refresh token
        res.cookie("token", refreshToken, {
          sameSite: "none",
          htmlOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // set the user to active
        verifiedUser.isActive = true;
        verifiedUser.verificationEmailToken = undefined;
        verifiedUser.verificationEmailExpiresAt = undefined;
        console.log(verifiedUser);
        verifiedUser.save();

        // send the access token as a response to the client
        return { accessToken };
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  login: {
    type: TokenType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      type: {
        type: UserType,
        defaultValue: UserType.getValue("student"),
      },
    },
    async resolve(parent, args, { req, res }) {
      try {
        const { email, password, type } = args;

        if (!email?.trim() || !password?.trim() || !type) {
          throw new GraphQLError("Please provide all required fields");
        }

        const { isAuth, user: authUser } = req.raw;

        if (isAuth && authUser) {
          throw new GraphQLError("You are already logged in!");
        }

        const errors = validation(Object.entries(args));
        const isValid = Object.keys(errors)?.length === 0;

        if (!isValid) {
          throw new GraphQLError(Object.values(errors), {
            extensions: {
              code: "BAD REQUEST",
              http: { status: 400 },
            },
          });
        }

        let user;
        user =
          type === "Student"
            ? await Student.findOne({ email })
            : await Teacher.findOne({ email });

        if (!user)
          throw new GraphQLError("User not found!", {
            extensions: {
              http: { status: 404 },
            },
          });

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
          throw new GraphQLError("email or password is Invalid");

        const { accessToken, refreshToken } = createToken(user, type);

        res.cookie("token", refreshToken, {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expire in 7days like the refresh token
        });

        return { accessToken };
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  logout: {
    type: MessageType,
    args: {
      userId: { type: GraphQLID },
      type: {
        type: UserType,
        defaultValue: UserType.getValue("student"),
      },
    },

    async resolve(parent, args, { req, res }) {
      try {
        const { isAuth, user } = req.raw;
        console.log("user:", user);
        if (!isAuth || !user) {
          const cookies = req.raw.cookies;
          if (!cookies?.token) return { message: "You are already logged out" };
        }

        res.clearCookie("token", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        return { message: "You logged out successfully" };
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  forgetPassword: {
    type: MessageType,
    args: {
      email: { type: GraphQLString },
      type: {
        type: new GraphQLEnumType({
          name: "forgetPasswordType",
          values: {
            student: { value: "Student" },
            teacher: { value: "Teacher" },
          },
        }),
      },
    },

    async resolve(parent, args, { req, res }) {
      try {
        const type = args.type;
        user =
          type === "Student"
            ? await Student.findOne({ email: args.email })
            : await Teacher.findOne({ email: args.email });

        // } catch (err) {
        //   throw new GraphQLError(
        //     "Sorry we have a problem connecting to the database, Please try again later!",
        //     {
        //       extensions: {
        //         http: { status: 500 },
        //       },
        //     }
        //   );
        // }

        if (!user)
          throw new GraphQLError("Sorry,this user couldn't be found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });

        if (!user.isActive)
          throw new GraphQLError(
            "Your account is not active, verify your email or contact us",
            {
              extensions: {
                http: { status: 401 },
              },
            }
          );

        const token = otpGenerator.generate(6, {
          specialChars: false,
        });

        user.resetPasswordToken = token;
        user.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000;

        user.save();

        // sending reset password email
        // SendPasswordResetEmail(
        //   (userEmail = args.email),
        //   (username = user.firstname),
        //   (subject = "Password Reset"),
        //   token
        // );

        return { message: "Password reset email was sent successfully" };
      } catch (error) {
        throw new GraphQLError("An error occured, Please try again!");
      }
    },
  },
  resetPassword: {
    type: MessageType,
    args: {
      email: { type: GraphQLString },
      code: { type: GraphQLString },
      type: {
        type: new GraphQLEnumType({
          name: "resetPasswordType",
          values: {
            student: { value: "Student" },
            teacher: { value: "Teacher" },
          },
        }),
      },
      newPassword: { type: GraphQLString },
    },
    async resolve(parent, args) {
      try {
        const type = args.type;

        let verifiedUser;
        if (type === "Teacher") {
          verifiedUser = await Teacher.findOne({
            email: args.email,
            resetPasswordToken: args.code,
            resetPasswordExpiresAt: { $gt: Date.now() },
          });
        } else if (type === "Student") {
          verifiedUser = await Student.findOne({
            email: args.email,
            resetPasswordToken: args.code,
            resetPasswordExpiresAt: { $gt: Date.now() },
          });
        }
        if (!verifiedUser)
          throw new GraphQLError("Sorry,this user couldn't be found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });

        if (verifiedUser) {
          const hashedPassword = await bcrypt.hash(args.newPassword, 10);

          verifiedUser.password = hashedPassword;
          verifiedUser.resetPasswordToken = undefined;
          verifiedUser.resetPasswordExpiresAt = undefined;
          verifiedUser.save();
        }

        return {
          message: "Your password was reset successfully, you can login now",
        };
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
