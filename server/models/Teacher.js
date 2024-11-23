const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema(
  {
    firstname: { type: String, require: [true, "Please provide a name"] },
    lastname: { type: String, require: [true, "Please provide a family name"] },
    email: {
      type: String,
      require: [true, "please provide an email"],
      unique: [true],
    },
    password: {
      type: String,
      require: [true, "please provide a password"],
    },
    role: {
      type: String,
      enum: ["Manager", "Teacher", "Assistant_teacher "],
      default: "Teacher",
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
    about_me: String,
    education: [String],
    experience: Number,
    lessons_num: {
      type: Number,
      default: 0,
    },
    salary: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationEmailToken: String,
    verificationEmailExpiresAt: Date,
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
