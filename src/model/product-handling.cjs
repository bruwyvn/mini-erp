const { DataTypes } = require('sequelize')
const database = require('../database.cjs')
const Handling = require('./handling.cjs')

const ProductHandling = database.define('ProductHandling', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  costCents: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

ProductHandling.belongsTo(Product)
ProductHandling.belongsTo(Handling)

module.exports = ProductHandling
