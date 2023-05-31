const { DataTypes } = require('sequelize')

const uuid = {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  primaryKey: true
}

module.exports = uuid
