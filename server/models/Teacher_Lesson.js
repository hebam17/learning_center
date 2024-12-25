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
    // The capacity of each class
    students_num: { type: Number, default: 20 },
    // The number of students enrolled in this class
    enrolled_students_num: { type: Number, default: 0 },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Student",
      default: [],
    },
    price: Number,
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    ratings: {
      type: [Number],
      default: [],
    },
    usersRateId: {
      type: [mongoose.Schema.ObjectId],
      ref: "Student",
      default: [],
    },
    week_days: {
      type: [Number], // 0-6 sunday is 0
    },
    type: {
      type: String,
      enum: ["Regular", "Revision"],
    },
    start_date: Date,
    start_time: String,
    end_time: String,
    duration: Number, // Represent the number of weeks
    is_full: {
      type: Boolean,
      default: false,
    },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Teacher_Lesson = mongoose.model("Teacher_Lesson", TeacherLessonSchema);

module.exports = Teacher_Lesson;
