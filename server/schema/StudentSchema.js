const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLError,
  GraphQLEnumType,
} = require("graphql");
const {
  StudentType,
  StudentLessonType,
  LessonType,
  RateType,
} = require("./Types");
const Student = require("../models/Student");
const Student_Lesson = require("../models/Student_Lesson");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const { errorHandler, idCheck } = require("../utils/errorHandler");
const Teacher = require("../models/Teacher");

const queryFields = {
  students: {
    type: new GraphQLList(StudentType),
    resolve(parent, args) {
      try {
        return Student.find(
          {},
          {
            password: 0,
            resetPasswordToken: 0,
            resetPasswordExpiresAt: 0,
            verificationEmailToken: 0,
            verificationEmailExpiresAt: 0,
          }
        );
      } catch (err) {
        errorHandler(err);
      }
    },
  },
  student: {
    type: StudentType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.id);

        const student = Student.findById(args.id, {
          password: 0,
          resetPasswordToken: 0,
          resetPasswordExpiresAt: 0,
          verificationEmailToken: 0,
          verificationEmailExpiresAt: 0,
        });

        if (!student)
          throw new GraphQLError("This user doesn't exist", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });

        return student;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
  studentLessons: {
    type: GraphQLList(StudentLessonType),
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        const studentLessons = Student_Lesson.find({ studentId: args.id });

        return studentLessons;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

const mutationFields = {
  // addStudent: {
  //   type: StudentType,
  //   args: {
  //     firstname: { type: GraphQLNonNull(GraphQLString) },
  //     lastname: { type: GraphQLNonNull(GraphQLString) },
  //     email: { type: GraphQLNonNull(GraphQLString) },
  //     isActive: { type: GraphQLBoolean },
  //   },
  //   resolve(parent, args) {
  //     const student = new Student({
  //       firstname: args.firstname,
  //       lastname: args.lastname,
  //       email: args.email,
  //       isActive: args.isActive,
  //     });

  //     return student.save();
  //   },
  // },

  updateStudent: {
    type: StudentType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      email: { type: GraphQLString },
      isActive: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        return Student.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstname: args.firstname,
              lastname: args.lastname,
              email: args.email,
              isActive: args.isActive,
            },
          },
          { new: true }
        );
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  deleteStudent: {
    type: StudentType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      try {
        idCheck(args.id);
        // delete the student
        const student = await Student.findByIdAndDelete(args.id);

        if (!student) throw new GraphQLError("No student where found!");

        // get all student lessons
        const studentLessons = await Student_Lesson.find({
          studentId: args.id,
        });

        if (studentLessons) {
          // update all teacher lessons to remove the student from the class student array and decrease the class enrolled students by 1
          [...studentLessons].forEach(async (lesson) => {
            await Teacher_Lesson.findByIdAndUpdate(lesson.teacherLessonId, {
              $pull: { students: args.id },
              $inc: { students_num: -1 },
            });
          });

          // delete all student lessons
          await Student_Lesson.deleteMany({ studentId: args.id });
          return student;
        }

        return student;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
  rating: {
    type: RateType,
    args: {
      // the Teacher | Lesson id
      id: { type: GraphQLID },
      score: { type: GraphQLInt },
      ratedObject: {
        type: new GraphQLEnumType({
          name: "RatedObject",
          values: {
            teacher: { value: "Teacher" },
            lesson: { value: "Lesson" },
          },
        }),
      },
    },
    async resolve(parent, args) {
      try {
        const { isAuth, user } = req.raw;
        if (!isAuth || !user)
          throw new GraphQLError("You are unauthorized", {
            extensions: {
              code: "UNAUTHORIZED",
              http: { status: 401 },
            },
          });

        idCheck(args.id);
        const isTeacher = args.ratedObject === "Teacher" ? true : false;

        let ratedObj;
        if (isTeacher) {
          ratedObj = await Teacher.findByIdAndUpdate(args.id, {
            $set: {
              $push: { ratings: args.score },
              $addToSet: { usersRatedId: user.userId },
            },
          });

          if (!ratedObj)
            throw new GraphQLError("This teacher was not found!", {
              extensions: {
                code: "NOT FOUND",
                http: { status: 404 },
              },
            });
        } else {
          ratedObj = await Teacher_Lesson.findByIdAndUpdate(args.id, {
            $set: {
              $push: { ratings: args.score },
              $addToSet: { usersRatedId: user.userId },
            },
          });

          if (!ratedObj)
            throw new GraphQLError("This lesson was not found!", {
              extensions: {
                code: "NOT FOUND",
                http: { status: 404 },
              },
            });
        }

        return ratedObj;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
