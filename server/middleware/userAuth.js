require("dotenv").config();
const jwt = require("jsonwebtoken");

// auth middleware adds user info to the request body if they are authorized
const Auth = (req, res, next) => {
  const cookies = req?.cookies;
  // Check if both refreshToken and accessToken exists in cookies object
  if ("refreshToken" in cookies && "accessToken" in cookies) {
    const { refreshToken, accessToken } = cookies;

    // First verify refreshToken
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decodedRefresh) => {
        if (err) {
          // If not verified no need to continue
          req.isAuth = false;
          req.user = null;
          return next();
        }

        // If verified now we should verify the accessToken
        jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET,
          (err, decodedAccess) => {
            if (err) {
              // If not verified the user is not authorized
              req.isAuth = false;
              req.user = null;
              return next();
            } else {
              // If verified now both tokens are legitimate now the user is marked as authorized
              req.isAuth = true;
              req.user = decodedAccess;
              console.log("User is authorized");

              next();
            }
          }
        );
      }
    );
  } else {
    // If one token or both tokens not existing first place then the user is unautherized
    req.isAuth = false;
    req.user = null;
    console.log("Hello, this is auth middleware");

    return next();
  }
};

exports.Auth = Auth;
