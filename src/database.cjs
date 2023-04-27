const config = require("./config.cjs");
const Sequelize = require("sequelize");

const Database = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  { dialect: config.dbDialect, host: config.dbHost, port: config.dbPort }
);

module.exports = Database;
