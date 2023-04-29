/*
const express = require("express");

const routes = require("./routes.cjs");
const port = require("./config.cjs").port;

const app = express();

(async () => {
  await require("./database.cjs").sync({ alter: true });
})();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
*/
const express = require('express')
const app = express();
const port = 3000;
const sequelize = require('./src/system/config_db');

await sequelize.authenticate();

app.use('/usuario', require('./src/service/Usuario_service'));
app.use('/compra', require('./src/service/Compra_service'));
app.use('/fornecedor', require('./src/service/Fornecedor_service'));
app.use('/material', require('./src/service/Material_service'));
app.use('/transportadora', require('./src/service/Transportadora_service'));
app.use('/venda', require('./src/service/Venda_service'));
app.use('/cliente', require('./src/service/Cliente_service'));

app.use('/usuarioAdm', require('./src/service_adm/Usuario_service'));
app.use('/compraAdm', require('./src/service_adm/Compra_service'));
app.use('/fornecedorAdm', require('./src/service_adm/Fornecedor_service'));
app.use('/materialAdm', require('./src/service_adm/Material_service'));
app.use('/transportadoraAdm', require('./src/service_adm/Transportadora_service'));
app.use('/vendaAdm', require('./src/service_adm/Venda_service'));
app.use('/clienteAdm', require('./src/service_adm/Cliente_service'));


app.listen(port, ()=> {
    console.log(`servidor iniciando na porta ${port}`)
})



