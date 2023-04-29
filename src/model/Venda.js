const Sequelize = require('sequelize');
const sequelize = require('../config.js');
const Cliente = require('./Cliente.js');
const Fornecedor = require('./Fornecedor.js');
const Material = require('./Material.js');
const Transportadora = require('./Transportadora.js');

const Venda = sequelize.define('venda', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  descricao: {
    type: Sequelize.Mater,
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

Venda.belongsTo(Material, {
  foreignKey: {
    allowNull: false,
    name: 'materialId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});
Material.hasMany(Venda);

Venda.belongsTo(Cliente, {
  foreignKey: {
    allowNull: false,
    name: 'clienteId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});
Material.hasMany(Venda);

Venda.belongsTo(Transportadora, {
  foreignKey: {
    allowNull: false,
    name: 'transportadoraId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});
Material.hasMany(Venda);

module.exports = Venda;
