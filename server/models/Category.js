const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
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

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
