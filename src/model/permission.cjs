const { DataTypes } = require('sequelize')
const database = require('../database.cjs')

const Permission = database.define('Permission', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  }
})

Role.belongsToMany(Permission, { through: 'RolePermission' })
Permission.belongsToMany(Role, { through: 'RolePermission' })

module.exports = Permission
