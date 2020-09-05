const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (request, response, next) => {
  if (request.method === "OPTIONS") {
    next();
  }
  try {
    const token = request.cookies.token;
    if (!token) {
      return response
        .status(401)
        .json({ message: "Not authorized", headers: request.headers });
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    request.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: "Not authorized" });
  }
};
