const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");
const Lesson = require("../models/Lesson");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Teacher_Lesson = require("../models/Teacher_Lesson");

// Teacher Type
const TeacherType = new GraphQLObjectType({
  name: "Teacher",
  fields: () => ({
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    about_me: { type: GraphQLString },
    salary: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    resetPasswordToken: { type: GraphQLString },
    resetPasswordExpiresAt: { type: GraphQLInt },
    verificationPasswordToken: { type: GraphQLString },
    verificationPasswordExpiresAt: { type: GraphQLInt },
  }),
});

// Student Type
const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    resetPasswordToken: { type: GraphQLString },
    resetPasswordExpiresAt: { type: GraphQLInt },
    verificationPasswordToken: { type: GraphQLString },
    verificationPasswordExpiresAt: { type: GraphQLInt },
  }),
});

// Lesson Type
const LessonType = new GraphQLObjectType({
  name: "Lesson",
  fields: () => ({
    material: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

// Teacher_Lesson Type
const TeacherLessonType = new GraphQLObjectType({
  name: "Teacher_Lesson",
  fields: () => ({
    lesson: {
      type: LessonType,
      resolve(parent, args) {
        return Lesson.findById(parent.lessonId);
      },
    },
    teacher: {
      type: TeacherType,
      resolve(parent, args) {
        return Teacher.findById(parent.teacherId);
      },
    },
    students_num: { type: GraphQLInt },
    students: {
      type: [StudentType],
      resolve(parent, args) {
        return parent.students.map((studentId) => Student.findById(studentId));
      },
    },
    cost: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    week_days: { type: GraphQLInt },
    type: { type: GraphQLString },
    start_time: { type: GraphQLInt },
    end_time: { type: GraphQLInt },
    is_full: { type: GraphQLBoolean },
  }),
});

const StudentLessonType = new GraphQLObjectType({
  name: "Student_Lesson",
  fields: () => ({
    teacher_lesson: {
      type: TeacherLessonType,
      resolve(parent, args) {
        return Teacher_Lesson.findById(parent.teacher_lesson);
      },
    },
    student: {
      type: StudentType,
      resolve(parent, args) {
        return Student.findById(parent.studentId);
      },
    },
    lesson_status: { type: GraphQLString },
  }),
});

exports.TeacherType = TeacherType;
exports.StudentType = StudentType;
exports.LessonType = LessonType;
exports.TeacherLessonType = TeacherLessonType;
exports.StudentLessonType = StudentLessonType;
