const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");
const { StudentType, StudentLessonType, LessonType } = require("./Types");
const Student = require("../models/Student");
const Student_Lesson = require("../models/Student_Lesson");
const Teacher_Lesson = require("../models/Teacher_Lesson");

const queryFields = {
  students: {
    type: new GraphQLList(StudentType),
    resolve(parent, args) {
      return Student.find(
        {},
        { firstname: 1, lastname: 1, email: 1, isActive: 1 }
      );
    },
  },
  student: {
    type: StudentType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Student.findById(args.id, {
        firstname: 1,
        lastname: 1,
        email: 1,
        isActive: 1,
      });
    },
  },
  StudentLessons: {
    type: GraphQLList(StudentLessonType),
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Student_Lesson.find({ studentId: args.id });
    },
  },
};

const mutationFields = {
  // remove when add auth
  addStudent: {
    type: StudentType,
    args: {
      firstname: { type: GraphQLNonNull(GraphQLString) },
      lastname: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      isActive: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      const student = new Student({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        isActive: args.isActive,
      });

      return student.save();
    },
  },

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
    },
  },

  deleteStudent: {
    type: StudentType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      // delete the student
      const student = await Student.findByIdAndDelete(args.id);

      // get all student lessons
      const studentLessons = await Student_Lesson.find({ studentId: args.id });

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
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
