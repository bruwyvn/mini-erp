const express = require("express");
const Chance = require("chance");
const port = require("./config.cjs").port;
const routes = require("./routes.cjs");
const createSku = require("./lib/create-sku.cjs");

const { Inventory, Product } = require('./model')

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
