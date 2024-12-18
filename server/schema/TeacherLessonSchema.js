const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLError,
} = require("graphql");
const { TeacherLessonType } = require("./Types");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const Student_Lesson = require("../models/Student_Lesson");
const Student = require("../models/Student");
const { errorHandler, idCheck } = require("../utils/errorHandler");
const Teacher = require("../models/Teacher");
const mongoose = require("mongoose");

const queryFields = {
  teacherLesson: {
    type: TeacherLessonType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      try {
        idCheck(args.id);
        const data = await Teacher_Lesson.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(`${args.id}`),
            },
          },
          {
            $addFields: {
              ratingsCount: {
                $size: "$ratings",
              },
              rating: {
                $cond: [
                  {
                    $eq: ["$ratings", []],
                  },
                  0,
                  {
                    $avg: "$ratings",
                  },
                ],
              },
            },
          },
        ]);
        return Array.from(data)[0];
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  allTeachersLessons: {
    type: new GraphQLList(TeacherLessonType),
    resolve(parent, args) {
      try {
        return Teacher_Lesson.aggregate([
          {
            $addFields: {
              ratingsCount: {
                $size: "$ratings",
              },
              rating: {
                $cond: [
                  {
                    $eq: ["$ratings", []],
                  },
                  0,
                  {
                    $avg: "$ratings",
                  },
                ],
              },
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
        ]);
      } catch (error) {
        errorHandler(error);
      }
    },
  },

  teacherLessons: {
    type: new GraphQLList(TeacherLessonType),
    args: { teacherId: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.teacherId);
        return Teacher_Lesson.aggregate([
          {
            $match: {
              teacherId: new mongoose.Types.ObjectId(`${args.teacherId}`),
            },
          },
          {
            $addFields: {
              ratingsCount: {
                $size: "$ratings",
              },
              rating: {
                $cond: [
                  {
                    $eq: ["$ratings", []],
                  },
                  0,
                  {
                    $avg: "$ratings",
                  },
                ],
              },
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
        ]);
      } catch (err) {
        errorHandler(err);
      }
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
      enrolled_students_num: { type: GraphQLInt },
      students: { type: GraphQLList(GraphQLID) },
      price: { type: GraphQLInt },
      discount: { type: GraphQLInt },
      rating: { type: GraphQLInt },
      start_date: { type: GraphQLString },
      duration: { type: GraphQLInt },
      week_days: { type: GraphQLList(GraphQLInt) },
      start_time: { type: GraphQLString },
      end_time: { type: GraphQLString },
      is_full: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      try {
        idCheck(args.lessonId);
        idCheck(args.teacherId);

        // Create a date object from ISO date string
        const startDate = new Date(args.start_date);

        const teacherLesson = new Teacher_Lesson({
          lessonId: args.lessonId,
          teacherId: args.teacherId,
          students_num: args.students_num,
          enrolled_students_num: args.enrolled_students_num,
          students: args.students,
          price: args.price,
          discount: args.discount,
          rating: args.rating,
          start_date: startDate,
          duration: args.duraion,
          week_days: args.week_days,
          type: args.type,
          start_time: args.start_time,
          end_time: args.end_time,
          is_full: args.is_full,
        });

        // Increase the teacher's lessons number by 1
        Teacher.updateOne(
          { _id: args.teacherId },
          {
            $inc: { lessons_num: 1 },
          }
        );

        teacherLesson.save();

        return teacherLesson;
      } catch (err) {
        errorHandler(err);
      }
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
      enrolled_students_num: { type: GraphQLInt },
      students: { type: GraphQLList(GraphQLID) },
      price: { type: GraphQLInt },
      discount: { type: GraphQLInt },
      rating: { type: GraphQLInt },
      start_date: { type: GraphQLString },
      duration: { type: GraphQLInt },
      week_days: { type: GraphQLList(GraphQLInt) },
      start_time: { type: GraphQLString },
      end_time: { type: GraphQLString },
      is_full: { type: GraphQLBoolean },
    },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        // Create a date object from ISO date string
        const startDate = new Date(args.start_date);

        return Teacher_Lesson.findByIdAndUpdate(
          args.id,
          {
            $set: {
              lessonId: args.lessonId,
              teacher: args.teacherId,
              students_num: args.students_num,
              enrolled_students_num: args.enrolled_students_num,
              students: args.students,
              price: args.price,
              discount: args.discount,
              rating: args.rating,
              start_date: startDate,
              duration: args.duraion,
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
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  whishlistAdd: {
    type: TeacherLessonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      studentId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      try {
        idCheck(args.id);
        idCheck(args.studentId);

        const student = Student.findById(args.studentId);
        const teacher_Lesson = Teacher_Lesson.findById(args.id);

        if (!student || !teacher_Lesson)
          throw new GraphQLError("Student or lesson were not found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });
        if (student && teacher_Lesson) {
          await Student.findByIdAndUpdate(args.studentId, {
            $addToSet: { whishlist: args.id },
          });
        }
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  whishlistRemove: {
    type: TeacherLessonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
      studentId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      try {
        idCheck(args.id);
        idCheck(args.studentId);
        const student = Student.findById(args.studentId);
        const teacher_Lesson = Teacher_Lesson.findById(args.id);

        if (!student || !teacher_Lesson)
          throw new GraphQLError("Student or lesson were not found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });

        if (student && teacher_Lesson) {
          await Student.findByIdAndUpdate(args.studentId, {
            $pull: { whishlist: args.id },
          });
        }
      } catch (err) {
        errorHandler(err);
      }
    },
  },

  deleteTeacherLesson: {
    type: TeacherLessonType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      try {
        idCheck(args.id);
        // delete the teacher lesson
        const teacherLesson = await Teacher_Lesson.findByIdAndDelete(args.id);
        if (!teacherLesson)
          throw new GraphQLError("This lesson was not found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });

        // delete the associated student lessons
        await Student_Lesson.deleteMany({ teacherLessonId: args.id });
        return teacherLesson;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
