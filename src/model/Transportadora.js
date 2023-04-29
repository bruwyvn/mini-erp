const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const Transportadora = sequelize.define('transportadora', {
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
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true

  },
  observacao: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Transportadora;
