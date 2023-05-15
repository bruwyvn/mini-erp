const { DataTypes } = require('sequelize')

const uuidField = {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  primaryKey: true
}

module.exports = uuidField
