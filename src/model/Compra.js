const Sequelize = require('sequelize');
const sequelize = require('../config.js');
const Fornecedor = require('./Fornecedor.js');
const Material = require('./Material.js');

const Compra = sequelize.define('compra', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hora: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

});

Compra.belongsTo(Material, {
  foreignKey: {
    allowNull: false,
    name: 'materialId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});
Material.hasMany(Compra);

Compra.belongsTo(Fornecedor, {
  foreignKey: {
    allowNull: false,
    name: 'fornecedorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});
Fornecedor.hasMany(Compra);


module.exports = Compra;
