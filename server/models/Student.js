const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
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

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationPasswordToken: String,
    verificationPasswordExpiresAt: Date,
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
