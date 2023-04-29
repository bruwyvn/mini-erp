const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});
const Cliente = require('../model/Cliente')(sequelize, Sequelize);
const Compra = require('../model/Compra')(sequelize, Sequelize);
const Fornecedor = require('../model/Fornecedor')(sequelize, Sequelize);
const Material = require('../model/Material')(sequelize, Sequelize);
const Transportadora = require('../model/Transportadora')(sequelize, Sequelize);
const Usuario = require('../model/Usuario')(sequelize, Sequelize);
const Venda = require('../model/Venda')(sequelize, Sequelize);



sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
