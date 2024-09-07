require("dotenv").config();
const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const auth = req.headers.Authorization || req.headers.authorization;

  if (auth?.startsWith("Bearer ")) {
    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        req.isAuth = false;
        req.user = null;
        next();
      } else {
        req.isAuth = true;
        req.user = decodedToken;

        next();
      }
    });
  } else {
    req.isAuth = false;
    req.user = null;

    next();
  }
};

exports.Auth = Auth;
