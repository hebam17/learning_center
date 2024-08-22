const { GraphQLNonNull, GraphQLID, GraphQLEnumType } = require("graphql");
const ObjectId = require("mongoose").ObjectId;
const {
  StudentLessonType,
  TeacherLessonType,
  StudentType,
} = require("./Types");
const Student_Lesson = require("../models/Student_Lesson");
const Teacher = require("../models/Teacher");
const Teacher_Lesson = require("../models/Teacher_Lesson");

const queryFields = {
  studentLesson: {
    type: StudentLessonType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Student_Lesson.findById(args.id);
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
      const teacherLesson = Teacher_Lesson.findById(args.teacherLessonId);
      if (teacherLesson.is_full)
        throw new Error("The class no longer accept students!");

      const existStudentLesson = await Student_Lesson.findOne({
        teacherLessonId: args.teacherLessonId,
        studentId: args.studentId,
      });

      console.log("existStudentLesson:", existStudentLesson);
      if (existStudentLesson)
        throw new Error("You already enrolled in this class!");

      const studentLesson = new Student_Lesson({
        teacherLessonId: args.teacherLessonId,
        studentId: args.studentId,
        lesson_status: args.lesson_status,
      });

      studentLesson.save().catch((err) => {
        return new Error(err.message);
      });

      // add the student id to the Teacher_Lesson collection
      const teacherLesson2 = await Teacher_Lesson.findByIdAndUpdate(
        args.teacherLessonId,
        {
          $addToSet: { students: args.studentId },
          $inc: { students_num: 1 },
        }
      );
      console.log("teacherLesson2:", teacherLesson2);
      return studentLesson;
    },
  },

  disEnroll: {
    type: StudentLessonType,
    args: { id: { type: GraphQLID } },

    async resolve(parent, args) {
      // delete the student lesson
      const studentLesson = await Student_Lesson.findByIdAndDelete(args.id);

      // remove the student from the teachers lesson list and decrease the students number by 1
      await Teacher_Lesson.findByIdAndUpdate(studentLesson.teacherLessonId, {
        $pull: { students: studentLesson.studentId },
        $inc: { students_num: -1 },
      });

      return studentLesson;
    },
  },
};

exports.queryFields = queryFields;
exports.mutationFields = mutationFields;
