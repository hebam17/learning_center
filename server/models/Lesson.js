const mongoose = require("mongoose");

const LessonSchema = mongoose.Schema(
  {
    material: {
      type: String,
      enum: [
        "Arabic",
        "English",
        "French",
        "Math",
        "Geography",
        "History",
        "Biology",
        "Chemistry",
        "Physics",
        "Philosophy",
        "Psychology",
        "Computer_Science",
      ],
      unique: true,
    },
    title: String,
    description: String,
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", LessonSchema);

module.exports = Lesson;
