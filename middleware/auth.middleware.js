const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (request, response, next) => {
  if (request.method === "OPTIONS") {
    next();
  }
  try {
    const access_token = request.cookies.access_token;
    if (!access_token) {
      return response
        .status(401)
        .json({ message: "Not authorized", headers: request.headers });
    }
    jwt.verify(access_token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const refresh_token = request.cookies.refresh_token;
          jwt.verify(refresh_token, config.get("jwtSecret"), function (
            err,
            decoded
          ) {
            if (!err) {
              const userId = decoded.userId;
              const newAccess = jwt.sign(
                {
                  userId,
                },
                config.get("jwtSecret"),
                { expiresIn: "1 min" }
              );
              const newRefresh = jwt.sign(
                {
                  userId,
                },
                config.get("jwtSecret"),
                { expiresIn: "3 min" }
              );
              response.cookie("access_token", newAccess, { httpOnly: true });
              response.cookie("refresh_token", newRefresh, { httpOnly: true });
              request.user = decoded;
              next();
            } else {
              console.log("so the refresh is dead ");
              throw new Error(err);
            }
          });
        }
      } else {
        request.user = decoded;
        next();
      }
    });
  } catch (error) {
    // console.log(error);
    return response.status(403).json({ message: "Not authorized" });
  }
};
