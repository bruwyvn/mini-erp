const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const uuid = require('../util/uuid.cjs')
const Product = require('./product.cjs')

const Inventory = database.define('Inventory', {
  id: uuid,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Inventory.belongsToMany(Product, { through: 'InventoryProduct' })
Product.belongsToMany(Inventory, { through: 'InventoryProduct' })

module.exports = Inventory
