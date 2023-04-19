require("dotenv").config();
const process = require("process");
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

module.exports = {
  port,
  secretKey,
};
