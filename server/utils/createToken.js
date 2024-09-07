const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user, type) => {
  let fullname = `${user.firstname} ${user.lastname}`;
  // set roles
  const roles = type === "Student" ? [type] : [type, user.role];
  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: fullname,
      roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id,
      username: fullname,
      roles,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

const createAccessToken = (user, type) => {
  let fullname = `${user.firstname} ${user.lastname}`;
  // set roles
  const roles = type === "Student" ? [type] : [type, user.role];
  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: fullname,
      roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return { accessToken };
};

exports.createToken = createToken;
exports.createAccessToken = createAccessToken;
