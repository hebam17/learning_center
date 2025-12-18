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
  TokenType,
  MessageType,
  RegisterVerificationInputType,
  UserType,
} = require("./Types");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const {
  createToken,
  createIDToken,
  setCookies,
  clearCookies,
} = require("../utils/createToken");
const { errorHandler, idCheck } = require("../utils/errorHandler");
// const { SendVerificationEmail } = require("../mail/emails");

const queryFields = {
  refresh: {
    type: MessageType,

    async resolve(parent, args, { req, res }) {
      try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken)
          throw new GraphQLError("You are unauthorized", {
            extensions: {
              http: { status: 401 },
            },
          });

        const refreshToken = cookies.refreshToken;

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

          const { accessToken, refreshToken } = createToken(user, type);

          setCookies(res, refreshToken, accessToken);

          return { message: "The Token was successfully refreshed" };
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
  getId: {
    type: TokenType,

    async resolve(parent, args, { req, res }) {
      try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken || !cookies?.accessToken)
          throw new GraphQLError("You are unauthorized", {
            extensions: {
              http: { status: 401 },
            },
          });

        const refreshToken = cookies.refreshToken;

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

          const idToken = createIDToken(user, type);

          return { idToken };
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
    type: MessageType,
    args: {
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

        // return { message: "Registered successfully!", userId: newUser._id };
        return { message: "User was Registered successfully!" };
      } catch (err) {
        console.log(err);

        errorHandler(err);
      }
    },
  },

  registerVerification: {
    type: MessageType,
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

        // set the user to active
        verifiedUser.isActive = true;
        verifiedUser.verificationEmailToken = undefined;
        verifiedUser.verificationEmailExpiresAt = undefined;
        console.log(verifiedUser);
        verifiedUser.save();

        // send a message as a response to the client
        return {
          message: "The user was verified successfully, Now you can Login!",
        };
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

        // Create an access token and refresh token
        const { accessToken, refreshToken } = createToken(user, type);

        // Create an ID token

        const idToken = createIDToken(user, type);

        setCookies(res, refreshToken, accessToken);

        return { idToken };
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
          const cookies = req.cookies;
          if (!cookies?.refreshToken)
            return { message: "You are already logged out" };
        }

        clearCookies(res);

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
        type: UserType,
        defaultValue: UserType.getValue("student"),
      },
    },

    async resolve(parent, args, { req, res }) {
      try {
        const type = args.type;
        user =
          type === "Student"
            ? await Student.findOne({ email: args.email })
            : await Teacher.findOne({ email: args.email });

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

        console.log("token:", token);

        user.resetPasswordToken = token;
        // Token is only valid for 10 minutes
        user.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000;

        user.save();

        // sending reset password email =>  uncomment this and change settings in the "../mail/emails" file to send Reset Password email

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

  verifyOTP: {
    type: MessageType,
    args: {
      email: { type: GraphQLString },
      code: { type: GraphQLString },
      type: {
        type: UserType,
        defaultValue: UserType.getValue("student"),
      },
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
          return {
            message: "Your OTP is Valid!",
          };
        }

        return {
          message: "Your code was successfully verified",
        };
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  resetPassword: {
    type: MessageType,
    args: {
      email: { type: GraphQLString },
      code: { type: GraphQLString },
      type: {
        type: UserType,
        defaultValue: UserType.getValue("student"),
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
