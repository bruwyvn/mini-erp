const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuid = require('../util/uuid.cjs')
const Role = require('./role.cjs')

const Permission = database.define('Permission', {
  id: uuid,
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
