const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
} = require("graphql");
const { TeacherLessonType, LessonType, StudentType } = require("./Types");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const Student_Lesson = require("../models/Student_Lesson");

const queryFields = {
  teacherLesson: {
    type: TeacherLessonType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Teacher_Lesson.findById(args.id);
    },
  },
};

const mutationFields = {
  addTeacherLesson: {
    type: TeacherLessonType,
    args: {
      type: {
        type: new GraphQLEnumType({
          name: "teacherLessonType",
          values: {
            regular: { value: "Regular" },
            revision: { value: "Revision" },
          },
        }),
      },
      lessonId: { type: GraphQLNonNull(GraphQLID) },
      teacherId: { type: GraphQLNonNull(GraphQLID) },
      students_num: { type: GraphQLInt },
      students: { type: GraphQLList(GraphQLID) },
      cost: { type: GraphQLInt },
      rating: { type: GraphQLInt },
      start_date: { type: GraphQLInt },
      week_days: { type: GraphQLList(GraphQLInt) },
      start_time: { type: GraphQLInt },
      end_time: { type: GraphQLInt },
      is_full: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      const teacherLesson = new Teacher_Lesson({
        lessonId: args.lessonId,
        teacherId: args.teacherId,
        students_num: args.students_num,
        students: args.students,
        cost: args.cost,
        rating: args.rating,
        start_date: args.start_date,
        week_days: args.week_days,
        type: args.type,
        start_time: args.start_time,
        end_time: args.end_time,
        is_full: args.is_full,
      });

      teacherLesson.save();
      return teacherLesson;
    },
  },

  updateTeacherLesson: {
    type: TeacherLessonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      type: {
        type: new GraphQLEnumType({
          name: "teacherLessonTypeUpdate",
          values: {
            regular: { value: "Regular" },
            revision: { value: "Revision" },
          },
        }),
      },
      lessonId: { type: GraphQLID },
      teacherId: { type: GraphQLID },
      students_num: { type: GraphQLInt },
      students: { type: GraphQLList(GraphQLID) },
      cost: { type: GraphQLInt },
      rating: { type: GraphQLInt },
      start_date: { type: GraphQLInt },
      week_days: { type: GraphQLList(GraphQLInt) },
      start_time: { type: GraphQLInt },
      end_time: { type: GraphQLInt },
      is_full: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      return Teacher_Lesson.findByIdAndUpdate(
        args.id,
        {
          $set: {
            lessonId: args.lessonId,
            teacher: args.teacherId,
            students_num: args.students_num,
            students: args.students,
            cost: args.cost,
            rating: args.rating,
            start_date: args.start_date,
            week_days: args.week_days,
            type: args.type,
            start_time: args.start_time,
            end_time: args.end_time,
            is_full: args.is_full,
          },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );
    },
  },

  deleteTeacherLesson: {
    type: TeacherLessonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      // delete the teacher lesson
      const teacherLesson = await Teacher_Lesson.findByIdAndDelete(args.id);

      // delete the associated student lessons
      await Student_Lesson.deleteMany({ teacherLessonId: args.id });
      return teacherLesson;
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
