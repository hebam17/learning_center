const mongoose = require("mongoose");

const TeacherLessonSchema = mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    students_num: Number,
    students: { type: [mongoose.Schema.Types.ObjectId], ref: "Student" },
    cost: Number,
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    week_days: {
      type: [Number],
      min: 0,
      max: 6,
    },
    type: {
      type: String,
      enum: ["Regular", "Revision"],
    },
    start_time: Date,
    end_time: Date,
    is_full: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Teacher_Lesson = mongoose.model("Teacher_Lesson", TeacherLessonSchema);

module.exports = Teacher_Lesson;
