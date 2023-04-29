const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const Material = sequelize.define('material', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ativo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  precoCusto: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  estoque: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nomeFornecedor: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Material;
