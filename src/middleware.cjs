const jwt = require("jsonwebtoken");
const config = require("./config.cjs");

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.secretKey, (error, user) => {
      if (error) {
        return response.sendStatus(403);
      }
      request.user = user;
      next();
    });
  } else {
    response.sendStatus(401);
  }
};
