const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuidField = require('../util/uuid-field.cjs')

const Role = require('./role.cjs')

const Permission = database.define('Permission', {
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

Role.belongsToMany(Permission, { through: 'RolePermission' })
Permission.belongsToMany(Role, { through: 'RolePermission' })

module.exports = Permission
