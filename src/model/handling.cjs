const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuid = require('../util/uuid.cjs')
const ProductHandling = require('./product-handling.cjs')
const Inventory = require('./inventory.cjs')

const Handling = database.define('Handling', {
  id: uuid,
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

Handling.hasMany(ProductHandling)
Handling.belongsTo(Inventory)

module.exports = Handling
