const express = require("express");

const routes = require("./routes.cjs");
const port = require("./config.cjs").port;

const Product = require("./model/product.cjs");
const Inventory = require("./model/inventory.cjs");

const app = express();

(async () => {
  await require("./database.cjs").sync({ alter: true });

  const inventory = await Inventory.create({
    name: "My Inventory",
    location: "New York"
  });

  const product1 = await Product.create({
    sku: "PRD-001",
    description: "Product 1",
  });

  const product2 = await Product.create({
    sku: "PRD-002",
    description: "Product 2",
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
