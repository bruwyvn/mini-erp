/*
const express = require("express");
const Chance = require("chance");

const port = require("./config.cjs").port;
const routes = require("./routes.cjs");
const createSku = require("./lib/create-sku.cjs");

const Product = require("./model/product.cjs");
const Inventory = require("./model/inventory.cjs");

const app = express();
const chance = new Chance();

(async () => {
  await require("./database.cjs").sync({ alter: true });

  const inventoryDescription = chance.sentence({ words: 3 }).replace(/\./g, "");

  const address = chance.address();
  const city = chance.city();
  const state = chance.state();
  const zip = chance.zip();
  const country = chance.country({ full: true });

  const product1Description = chance.sentence({ words: 5 }).replace(/\./g, "");
  const product2Description = chance.sentence({ words: 5 }).replace(/\./g, "");

  const inventory = await Inventory.create({
    name: inventoryDescription.replace(/\s+/g, "-").toLowerCase(),
    description: inventoryDescription,
    location: `${address}\n${city}, ${state} ${zip}\n${country}`,
  });

  const product1 = await Product.create({
    sku: createSku(product1Description),
    description: product1Description,
  });

  const product2 = await Product.create({
    sku: createSku(product2Description),
    description: product2Description,
  });

  await inventory.addProduct(product1);
  await inventory.addProduct(product2);

  const products = await inventory.getProducts();

  console.log(products.map((p) => p.toJSON()));
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



