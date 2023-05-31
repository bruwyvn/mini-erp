const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuid = require('../util/uuid.cjs')
const User = require('./user.cjs')

const Role = database.define('Role', {
  uuid: uuid,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING
  }
})

User.belongsToMany(Role, { through: 'UserRole' })
Role.belongsToMany(User, { through: 'UserRole' })

module.exports = Role
