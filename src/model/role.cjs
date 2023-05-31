const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuidField = require('../util/uuid-field.cjs')

const User = require('./user.cjs')

const Role = database.define('Role', {
  uuid: uuidField,
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
