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
  RegisterSuccessType,
  registerVarificationType,
  loginType,
} = require("./Types");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
// const { SendVerificationEmail } = require("../mail/emails");

const queryFields = {};

const mutationFields = {
  register: {
    type: RegisterSuccessType,
    args: {
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },

      prof: {
        type: new GraphQLEnumType({
          name: "profession",
          values: {
            student: { value: "Student" },
            teacher: { value: "Teacher" },
          },
        }),
      },
    },
    async resolve(parent, args) {
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

      const isTeacher = args.prof === "Teacher";

      let existingUser;
      try {
        if (isTeacher) {
          existingUser = await Teacher.findOne({ email: args.email });
        } else if (!isTeacher) {
          existingUser = await Student.findOne({ email: args.email });
        }
      } catch (err) {
        throw new GraphQLError(
          "Sorry we have a problem connecting to the database, Please try again later!",
          {
            extensions: {
              http: { status: 500 },
            },
          }
        );
      }
      if (existingUser) {
        throw new GraphQLError("This email is already exist", {
          extensions: {
            http: { status: 400 },
          },
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(args.password, 10);
        // Create the verification token
        const verificationToken = otpGenerator.generate(6, {
          specialChars: false,
        });

        let newUser;
        if (isTeacher) {
          newUser = await Teacher.create({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            password: hashedPassword,
            verificationPasswordToken: verificationToken,
            verificationPasswordExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24hours || 1day
          });
        } else {
          newUser = await Student.create({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            password: hashedPassword,
            verificationPasswordToken: verificationToken,
            verificationPasswordExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24hours || 1day
          });
        }

        // sending a verification email
        // SendVerificationEmail(
        //   (userEmail = args.email),
        //   (username = args.firstname),
        //   (subject = "Email verification"),
        //   (verificationToken)
        // );

        return { message: "Registered successfully!", userId: newUser._id };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(
          "Sorry we have a problem connecting to the database, Please try again later!",
          {
            extensions: {
              http: { status: 500 },
            },
          }
        );
      }
    },
  },

  registerVarification: {
    type: registerVarificationType,
    args: {
      userId: { type: GraphQLID },
      type: {
        type: new GraphQLEnumType({
          name: "type",
          values: {
            student: { value: "Student" },
            teacher: { value: "Teacher" },
          },
        }),
      },
      code: { type: GraphQLString },
    },
    async resolve(parent, args, { req, res }) {
      // get whether it's a student or a teacher
      const type = args.type;

      let verifiedUser;
      try {
        if (type === "Teacher") {
          verifiedUser = await Teacher.findOne({
            _id: args.userId,
            verificationPasswordToken: args.code,
            verificationPasswordExpiresAt: { $gt: Date.now() },
          });
        } else if (type === "Student") {
          verifiedUser = await Student.findOne({
            _id: args.userId,
            verificationPasswordToken: args.code,
            verificationPasswordExpiresAt: { $gt: Date.now() },
          });
        }
        if (!verifiedUser)
          throw new GraphQLError("Sorry,this user couldn't be found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });
      } catch (err) {
        throw new GraphQLError(err);
      }
      if (verifiedUser.isActive === true)
        throw new GraphQLError("You are already verified, you can login", {
          extensions: {
            code: "BAD REQUEST",
            http: { status: 400 },
          },
        });

      let fullname = `${verifiedUser.firstname} ${verifiedUser.lastname}`;
      // set roles
      const roles =
        args.type === "Student" ? [args.type] : [args.type, verifiedUser.role];
      const accessToken = jwt.sign(
        {
          userId: verifiedUser._id,
          username: fullname,
          roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        {
          userId: verifiedUser._id,
          username: fullname,
          roles,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      // set the http only cookie to send the refresh token
      res.cookie("token", refreshToken, {
        sameSite: "none",
        htmlOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // set the user to active
      try {
        verifiedUser.isActive = true;
        verifiedUser.verificationPasswordToken = undefined;
        verifiedUser.verificationPasswordExpiresAt = undefined;
        console.log(verifiedUser);
        verifiedUser.save();
      } catch (err) {
        throw new GraphQLError(
          "Sorry we have a problem connecting to the database, Please try again later!",
          {
            extensions: {
              http: { status: 500 },
            },
          }
        );
      }

      // send the access token as a response to the client
      return { accessToken };
    },
  },

  login: {
    type: loginType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args, { req, res }) {},
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
