const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuidField = require('../util/uuid-field.cjs')

const Handling = database.define('Handling', {
  uuid: uuidField,
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
