const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const Fornecedor = sequelize.define('fornecedor', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  documento: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  razaoSocial: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true

  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Fornecedor;
