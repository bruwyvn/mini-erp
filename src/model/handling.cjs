const { DataTypes } = require('sequelize')
const database = require('../database.cjs')

const Handling = database.define('Handling', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('INBOUND', 'OUTBOUND'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  retailPriceCents: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Handling
