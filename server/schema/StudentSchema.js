const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLError,
} = require("graphql");
const { StudentType, StudentLessonType, LessonType } = require("./Types");
const Student = require("../models/Student");
const Student_Lesson = require("../models/Student_Lesson");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const { errorHandler, idCheck } = require("../utils/errorHandler");

const queryFields = {
  students: {
    type: new GraphQLList(StudentType),
    resolve(parent, args) {
      try {
        return Student.find(
          {},
          { firstname: 1, lastname: 1, email: 1, isActive: 1 }
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
          firstname: 1,
          lastname: 1,
          email: 1,
          isActive: 1,
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
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
