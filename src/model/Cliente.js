const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const Cliente = sequelize.define('cliente', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ativo: {
    type: Sequelize.INTEGER,
    allowNull: false
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
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true

  },
  enderecoCompleto: {
    type: Sequelize.STRING,
    allowNull: false
  },

});

module.exports = Cliente;
