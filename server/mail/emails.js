require("dotenv").config();
const { transporter } = require("./config");
const { verificationTemplate } = require("./emailTemplates");

const SendVerificationEmail = ({
  userEmail,
  subject,
  username,
  verificationToken,
}) => {
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: userEmail, // list of receivers
    subject, // Subject line
    html: verificationTemplate(username, verificationToken), // html body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Sorry an Error occur, please tyr again later!");
    }
    return true;
  });
};

const SendResetPasswordEmail = ({
  userEmail,
  subject,
  username,
  verificationToken,
}) => {
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: userEmail, // list of receivers
    subject, // Subject line
    html: verificationTemplate(username, verificationToken), // html body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Sorry an Error occur, please tyr again later!");
    }
    return true;
  });
};

exports.SendVerificationEmail = SendVerificationEmail;
exports.SendResetPasswordEmail = SendResetPasswordEmail;
