const jwt = require("jsonwebtoken");

const config = require("./config.cjs");
const middleware = require("./middleware.cjs");

const router = require("express").Router();

router.post("/auth", (_request, response) => {
  // authenticate user
  const user = { id: 1, username: "example_user" };
  const token = jwt.sign(user, config.secretKey, { expiresIn: 300 });
  response.json({ token });
});

router.get("/protected", middleware, (request, response) => {
  response.json({
    message: "You are authorized to access this route!",
    user: request.user,
  });
});

module.exports = router;
