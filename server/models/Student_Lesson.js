const mongoose = require("mongoose");

const StudentLessonSchema = mongoose.Schema(
  {
    teacherLessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher_Lesson",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    lesson_status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
    },
  },
  { timestamps: true }
);

StudentLessonSchema.index(
  { teacherLessonId: 1, studentId: 1 },
  { unique: true }
);

const Student_Lesson = mongoose.model("Student_Lesson", StudentLessonSchema);

module.exports = Student_Lesson;
