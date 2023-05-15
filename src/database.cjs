const Sequelize = require('sequelize')

const config = require('./config.cjs')

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_HOST,
  DB_PORT
} = config

const Database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT
})

module.exports = Database
