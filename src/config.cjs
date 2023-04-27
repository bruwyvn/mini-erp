require("dotenv").config();
const process = require("process");

const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

module.exports = {
  port,
  secretKey,
  dbUser,
  dbPassword,
  dbName,
  dbDialect,
  dbHost,
  dbPort,
};
