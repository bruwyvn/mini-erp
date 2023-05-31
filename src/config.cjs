require('dotenv').config()
const process = require('node:process')

const {
  PORT = 5001,
  SECRET_KEY = 'defaultSecret',
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  DB_HOST,
  DB_PORT
} = process.env

if (
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_NAME ||
  !DB_DIALECT ||
  !DB_HOST ||
  !DB_PORT
) {
  throw new Error('Missing required environment variables.')
}

const config = {
  PORT,
  SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  DB_HOST,
  DB_PORT
}

module.exports = config
