const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLEnumType,
  GraphQLBoolean,
} = require("graphql");
const { TeacherType, TeacherLessonType } = require("./Types");
const Teacher = require("../models/Teacher");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const Student_Lesson = require("../models/Student_Lesson");

const queryFields = {
  teachers: {
    type: new GraphQLList(TeacherType),
    resolve(parent, args) {
      return Teacher.find(
        {},
        {
          password: 0,
          resetPasswordToken,
          resetPasswordExpiresAt,
          verificationPasswordToken,
          verificationPasswordExpiresAt,
        }
      );
    },
  },
  teacher: {
    type: TeacherType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Teacher.findById(args.id, {
        password: 0,
        resetPasswordToken,
        resetPasswordExpiresAt,
        verificationPasswordToken,
        verificationPasswordExpiresAt,
      });
    },
  },
  teacherLessons: {
    type: GraphQLList(TeacherLessonType),
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Teacher_Lesson.find({ teacherId: args.id });
    },
  },
};

const mutationFields = {
  // remove when add auth
  addTeacher: {
    type: TeacherType,
    args: {
      firstname: { type: GraphQLNonNull(GraphQLString) },
      lastname: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      role: {
        type: new GraphQLEnumType({
          name: "role",
          values: {
            manager: { value: "Manager" },
            teacher: { value: "Teacher" },
            assistant: { value: "Assistant_teacher" },
          },
        }),
      },
      about_me: { type: GraphQLString },
      classes_num: { type: GraphQLInt },
      salary: { type: GraphQLInt },
      isActive: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      const teacher = new Teacher({
        firstname: args.firstname,
        lastname: args.lastname,
        email: args.email,
        role: args.role,
        about_me: args.about_me,
        classes_num: args.classes_num,
        salary: args.salary,
        isActive: args.isActive,
      });

      return teacher.save();
    },
  },
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
      classes_num: { type: GraphQLInt },
      salary: { type: GraphQLInt },
      isActive: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      return Teacher.findByIdAndUpdate(
        args.id,
        {
          $set: {
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            role: args.role,
            about_me: args.about_me,
            classes_num: args.classes_num,
            salary: args.salary,
            isActive: args.isActive,
          },
        },
        { new: true }
      );
    },
  },
  deleteTeacher: {
    type: TeacherType,
    args: { id: { type: GraphQLID } },

    async resolve(parent, args) {
      // delete the teacher
      const teacher = await Teacher.findByIdAndDelete(args.id);

      // get all the teacher's lessons
      const teacherLesson = await Teacher_Lesson.find({
        teacherId: args.id,
      });

      // loop through each lesson and delete the student lesson associated with
      [...teacherLesson].forEach(
        async (lesson) =>
          await Student_Lesson.deleteMany({ teacherLessonId: lesson.id })
      );

      // delete the teacher lesson
      await Teacher_Lesson.deleteMany({ teacherId: args.id });
      return teacher;
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
