const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLUnionType,
  GraphQLFloat,
} = require("graphql");
const Lesson = require("../models/Lesson");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Teacher_Lesson = require("../models/Teacher_Lesson");

// Teacher Type
const TeacherType = new GraphQLObjectType({
  name: "Teacher",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parent, args) {
        return parent._id;
      },
    },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    ratings: { type: GraphQLList(GraphQLInt) },
    rating: {
      type: GraphQLFloat,
      resolve(parent, args) {
        const num = parent.rating;
        return Math.round(num * 100 + Number.EPSILON) / 100;
      },
    },
    ratingsCount: { type: GraphQLInt },
    usersRate: {
      type: StudentType,
      resolve(parent, args) {
        return parent.usersRateId.map((userId) =>
          Student.findById(userId, {
            password: 0,
            resetPasswordToken: 0,
            resetPasswordExpiresAt: 0,
            verificationPasswordToken: 0,
            verificationPasswordExpiresAt: 0,
          })
        );
      },
    },
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
    whishlistLessons: {
      type: GraphQLList(TeacherLessonType),
      resolve(parent, args) {
        return parent.whishlist.map((lessonId) =>
          Teacher_Lesson.findById(lessonId)
        );
      },
    },
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
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    ratings: { type: GraphQLList(GraphQLInt) },
    rating: {
      type: GraphQLFloat,
      resolve(parent, args) {
        const num = parent.rating;
        return Math.round(num * 100 + Number.EPSILON) / 100;
      },
    },
    ratingsCount: { type: GraphQLInt },
    usersRate: {
      type: StudentType,
      resolve(parent, args) {
        return parent.usersRateId.map((userId) =>
          Student.findById(userId, {
            password: 0,
            resetPasswordToken: 0,
            resetPasswordExpiresAt: 0,
            verificationPasswordToken: 0,
            verificationPasswordExpiresAt: 0,
          })
        );
      },
    },
    start_date: { type: GraphQLInt },
    week_days: { type: GraphQLList(GraphQLInt) },
    duration: { type: GraphQLInt },
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

const tokenType = new GraphQLObjectType({
  name: "Token",
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

const messageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

const updateProfileType = StudentType | TeacherType;

const RatingType = new GraphQLObjectType({
  name: "Rating",
  fields: () => ({
    rate: { type: GraphQLFloat },
    ratingNumber: { type: GraphQLInt },
  }),
});

const RatedType = new GraphQLUnionType({
  name: "Rated",
  types: [TeacherType, TeacherLessonType],
});

const RateType = new GraphQLObjectType({
  name: "Rate",
  fields: () => ({
    message: { type: GraphQLString },
    ratedObj: { type: RatedType },
  }),
});

exports.TeacherType = TeacherType;
exports.StudentType = StudentType;
exports.LessonType = LessonType;
exports.TeacherLessonType = TeacherLessonType;
exports.StudentLessonType = StudentLessonType;
exports.RegisterSuccessType = RegisterSuccessType;
exports.tokenType = tokenType;
exports.messageType = messageType;
exports.RateType = RateType;
