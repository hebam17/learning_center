const mongoose = require("mongoose");

const StudentLessonSchema = mongoose.Schema(
  {
    teacher_Lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher_Lesson",
    },
    student: {
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

const Student_Lesson = mongoose.model("Student_Lesson", StudentLessonSchema);

module.exports = Student_Lesson;
