const { DataTypes } = require("sequelize");
const database = require("../database.cjs");
const Product = require("./product.cjs");

const Inventory = database.define("Inventory", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Inventory.belongsToMany(Product, { through: "InventoryProduct" });
Product.belongsToMany(Inventory, { through: "InventoryProduct" });

module.exports = Inventory;
