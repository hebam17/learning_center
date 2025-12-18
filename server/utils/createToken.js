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

const createIDToken = (user, type) => {
  let fullname = `${user.firstname} ${user.lastname}`;
  // set roles
  const roles = type === "Student" ? [type] : [type, user.role];
  console.log("roles:", roles);
  const idToken = jwt.sign(
    {
      userId: user._id,
      username: fullname,
      roles,
    },
    process.env.ID_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return idToken;
};

const setCookies = (res, refreshToken, accessToken) => {
  res.cookie("refreshToken", refreshToken, {
    sameSite: "Lax",
    secure: true,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expire in 7days like the refreshToken
  });

  res.cookie("accessToken", accessToken, {
    sameSite: "Lax",
    secure: true,
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // cookie expire in 15min like the accessToken token
  });
};

// clearCookies
const clearCookies = (res) => {
  // Clear the refreshToken cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
  });

  // Clear the accessToken cookie

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
  });
};

exports.createToken = createToken;
exports.createIDToken = createIDToken;
exports.setCookies = setCookies;
exports.clearCookies = clearCookies;
