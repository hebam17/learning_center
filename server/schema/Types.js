const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const Lesson = require("../models/Lesson");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Teacher_Lesson = require("../models/Teacher_Lesson");

// Teacher Type
const TeacherType = new GraphQLObjectType({
  name: "Teacher",
  fields: () => ({
    id: { type: GraphQLID },
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
    id: { type: GraphQLID },
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
    id: { type: GraphQLID },
    material: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

// Teacher_Lesson Type
const TeacherLessonType = new GraphQLObjectType({
  name: "TeacherLesson",
  fields: () => ({
    id: { type: GraphQLID },
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
      type: GraphQLList(StudentType),
      resolve(parent, args) {
        return parent.students.map((studentId) => Student.findById(studentId));
      },
    },
    cost: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    start_date: { type: GraphQLInt },
    week_days: { type: GraphQLList(GraphQLInt) },
    type: { type: GraphQLString },
    start_time: { type: GraphQLInt },
    end_time: { type: GraphQLInt },
    is_full: { type: GraphQLBoolean },
  }),
});

const StudentLessonType = new GraphQLObjectType({
  name: "StudentLesson",
  fields: () => ({
    id: { type: GraphQLID },
    teacherLesson: {
      type: TeacherLessonType,
      resolve(parent, args) {
        return Teacher_Lesson.findById(parent.teacherLessonId);
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

// Auth Types
const RegisterSuccessType = new GraphQLObjectType({
  name: "Register",
  fields: () => ({
    message: { type: GraphQLString },
    // id: { type: GraphQLID },
    userId: { type: GraphQLID },
  }),
});

const registerVarificationType = new GraphQLObjectType({
  name: "RegisterVerification",
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

const loginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

const logout = new GraphQLObjectType({
  name: "logout",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

exports.TeacherType = TeacherType;
exports.StudentType = StudentType;
exports.LessonType = LessonType;
exports.TeacherLessonType = TeacherLessonType;
exports.StudentLessonType = StudentLessonType;
exports.RegisterSuccessType = RegisterSuccessType;
exports.registerVarificationType = registerVarificationType;
exports.loginType = loginType;
exports.logoutType = logoutType;
