const { DataTypes } = require("sequelize");
const database = require("../database.cjs");
const uuid = require("../util/uuid.cjs");
const ProductHandling = require("./product-handling.cjs")

const Product = database.define("Product", {
  id: uuid,
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

Product.hasMany(ProductHandling)

module.exports = Product;
