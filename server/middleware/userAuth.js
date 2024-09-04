const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = (req, res, next) => {
  const auth = req.headers.Authorization || req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    req.isAuth = false;
    req.user = null;
    next();
  } else {
    const token = auth.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.isAuth = true;
    req.user = decodedToken;

    next();
  }
};

exports.Auth = Auth;
