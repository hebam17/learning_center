const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
  GraphQLError,
} = require("graphql");
const ObjectId = require("mongoose").ObjectId;
const {
  StudentLessonType,
  TeacherLessonType,
  StudentType,
} = require("./Types");
const Student_Lesson = require("../models/Student_Lesson");
const Teacher = require("../models/Teacher");
const Teacher_Lesson = require("../models/Teacher_Lesson");
const { idCheck, errorHandler } = require("../utils/errorHandler");

const queryFields = {
  studentLesson: {
    type: StudentLessonType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      try {
        idCheck(args.id);
        return Student_Lesson.findById(args.id);
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

const mutationFields = {
  enroll: {
    type: StudentLessonType,
    args: {
      teacherLessonId: { type: GraphQLNonNull(GraphQLID) },
      studentId: { type: GraphQLNonNull(GraphQLID) },
      lesson_status: {
        type: new GraphQLEnumType({
          name: "lessonStatus",
          values: {
            new: { value: "Not Started" },
            progress: { value: "In Progress" },
            completed: { value: "Completed" },
          },
        }),
      },
    },

    async resolve(parent, args) {
      try {
        idCheck(args.teacherLessonId);
        idCheck(args.studentId);

        const teacherLesson = await Teacher_Lesson.findById(
          args.teacherLessonId
        );
        if (!teacherLesson)
          throw new GraphQLError("This lesson was not found!", {
            extensions: {
              code: "NOT FOUND",
              http: { status: 404 },
            },
          });

        if (teacherLesson?.is_full)
          throw new GraphQLError("This class is no longer accepts students!");

        // const existStudentLesson = await Student_Lesson.findOne({
        //   teacherLessonId: args.teacherLessonId,
        //   studentId: args.studentId,
        // });

        if (teacherLesson?.students?.includes(args.studentId))
          throw new GraphQLError("You already enrolled in this class!");

        const studentLesson = new Student_Lesson({
          teacherLessonId: args.teacherLessonId,
          studentId: args.studentId,
          lesson_status: args.lesson_status,
        });
        studentLesson.save();
        // Set isFull to true if the students number is going to complete
        const isFull =
          studentLesson.enrolled_students_num === studentLesson.students_num - 1
            ? true
            : false;

        // add the student id to the Teacher_Lesson collection
        await Teacher_Lesson.findByIdAndUpdate(args.teacherLessonId, {
          isFull,
          $addToSet: { students: args.studentId },
          $inc: { enrolled_students_num: 1 },
        });
        return studentLesson;
      } catch (err) {
        console.log(err);
        errorHandler(err);
      }
    },
  },

  disEnroll: {
    type: StudentLessonType,
    args: { teacherLessonId: { type: GraphQLID } },

    async resolve(parent, args) {
      try {
        idCheck(args.teacherLessonId);
        const { isAuth, user: authUser } = req.raw;

        console.log(authUser);
        // Check if the user loggedin first
        if (!isAuth && !authUser) {
          throw new GraphQLError("You are unauthorized", {
            extensions: {
              http: { status: 401 },
            },
          });
        }
        const { userId } = authUser;

        // // delete the student lesson
        const studentLesson = await Student_Lesson.findOneAndDelete({
          teacherLessonId: args.teacherLessonId,
          studentId: userId,
        });

        if (!studentLesson)
          throw new GraphQLError("You are not enrolled in this class", {
            extensions: {
              code: "UNAUTHORIZED",
              http: { status: 403 },
            },
          });

        // find the teacherLesson and remove the student from the enrolled students list and decrease the students number by 1
        const lesson = await Teacher_Lesson.findByIdAndUpdate(
          args.teacherLessonId,
          {
            $pull: { students: userId },
            $inc: { enrolled_students_num: -1 },
          },
          { new: true }
        );

        if (!lesson)
          throw new GraphQLError("Lesson not found", {
            extensions: {
              code: "NOTFOUND",
              http: { status: 404 },
            },
          });

        return lesson;
      } catch (err) {
        errorHandler(err);
      }
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
