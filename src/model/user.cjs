const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuid = require('../util/uuid.cjs')

const User = database.define('User', {
  uuid: uuid,
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
