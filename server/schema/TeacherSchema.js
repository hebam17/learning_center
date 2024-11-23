const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLError,
} = require("graphql");
const { TeacherType, TeacherLessonType } = require("./Types");
const Teacher = require("../models/Teacher");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const Student_Lesson = require("../models/Student_Lesson");
const { errorHandler, idCheck } = require("../utils/errorHandler");
const { mongoose } = require("mongoose");

const queryFields = {
  teachers: {
    type: new GraphQLList(TeacherType),
    resolve(parent, args) {
      try {
        // return Teacher.find(
        //   {},
        //   {
        //     password: 0,
        //     resetPasswordToken: 0,
        //     resetPasswordExpiresAt: 0,
        //     verificationEmailToken: 0,
        //     verificationEmailExpiresAt: 0,
        //   }
        // );
        return Teacher.aggregate([
          {
            $addFields: {
              ratingsCount: {
                $size: "$ratings",
              },
              rating: {
                $avg: "$ratings",
              },
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          {
            $project: {
              resetPasswordToken: 0,
              resetPasswordExpiresAt: 0,
              verificationEmailToken: 0,
              verificationEmailExpiresAt: 0,
            },
          },
        ]);
      } catch (error) {
        errorHandler(error);
      }
    },
  },

  teacher: {
    type: TeacherType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        return Teacher.findById(args.id, {
          password: 0,
          resetPasswordToken: 0,
          resetPasswordExpiresAt: 0,
          verificationEmailToken: 0,
          verificationEmailExpiresAt: 0,
        });
      } catch (err) {
        errorHandler(err);
      }
    },
  },
  teacherLessons: {
    type: GraphQLList(TeacherLessonType),
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        return Teacher_Lesson.find({ teacherId: args.id });
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

const mutationFields = {
  // addTeacher: {
  //   type: TeacherType,
  //   args: {
  //     firstname: { type: GraphQLNonNull(GraphQLString) },
  //     lastname: { type: GraphQLNonNull(GraphQLString) },
  //     email: { type: GraphQLNonNull(GraphQLString) },
  //     role: {
  //       type: new GraphQLEnumType({
  //         name: "role",
  //         values: {
  //           manager: { value: "Manager" },
  //           teacher: { value: "Teacher" },
  //           assistant: { value: "Assistant_teacher" },
  //         },
  //       }),
  //     },
  //     about_me: { type: GraphQLString },
  //     lessons_num: { type: GraphQLInt },
  //     salary: { type: GraphQLInt },
  //     isActive: { type: GraphQLBoolean },
  //   },
  //   resolve(parent, args) {
  //     const teacher = new Teacher({
  //       firstname: args.firstname,
  //       lastname: args.lastname,
  //       email: args.email,
  //       role: args.role,
  //       about_me: args.about_me,
  // education: { type: GraphQLList(GraphQLString) },
  // experience: { type: GraphQLInt },
  //       lessons_num: args.lessons_num,
  //       salary: args.salary,
  //       isActive: args.isActive,
  //     });

  //     return teacher.save();
  //   },
  // },
  updateTeacher: {
    type: TeacherType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      email: { type: GraphQLString },
      role: {
        type: new GraphQLEnumType({
          name: "roleUpdate",
          values: {
            manager: { value: "Manager" },
            teacher: { value: "Teacher" },
            assistant: { value: "Assistant_teacher" },
          },
        }),
      },
      about_me: { type: GraphQLString },
      education: { type: GraphQLList(GraphQLString) },
      experience: { type: GraphQLInt },
      lessons_num: { type: GraphQLInt },
      salary: { type: GraphQLInt },
      isActive: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        return Teacher.findByIdAndUpdate(
          args.id,
          {
            $push: { education: args.education },
            $set: {
              firstname: args.firstname,
              lastname: args.lastname,
              email: args.email,
              role: args.role,
              about_me: args.about_me,
              experience: args.experience,
              lessons_num: args.lessons_num,
              salary: args.salary,
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
  deleteTeacher: {
    type: TeacherType,
    args: { id: { type: GraphQLID } },

    async resolve(parent, args) {
      try {
        idCheck(args.id);
        // delete the teacher
        const teacher = await Teacher.findByIdAndDelete(args.id);
        if (!teacher) throw new GraphQLError("Not matched teacher were found");

        // get all the teacher's lessons
        const teacherLesson = await Teacher_Lesson.find({
          teacherId: args.id,
        });

        if (teacherLesson) {
          // loop through each lesson and delete the student lesson associated with
          [...teacherLesson].forEach(
            async (lesson) =>
              await Student_Lesson.deleteMany({ teacherLessonId: lesson.id })
          );

          // delete the teacher lesson
          await Teacher_Lesson.deleteMany({ teacherId: args.id });
          return teacher;
        }
        return teacher;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
