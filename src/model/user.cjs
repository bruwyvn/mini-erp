const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuidField = require('../util/uuid-field.cjs')

const User = database.define('User', {
  uuid: uuidField,
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User
