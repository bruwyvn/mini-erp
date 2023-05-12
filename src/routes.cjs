const express = require("express");
const loginRouter = require("./login-router.cjs");
const middleware = require("./middleware.cjs");

const { Inventory, Product } = require("./model");

const router = express.Router();

router.use("/login", loginRouter);

router.get("/protected", middleware, async ({ user }, response) => {
  const hasPermission = user.Roles.some((role) =>
    role.Permissions.some(
      (permission) => permission.name === "access_protected"
    )
  );
  if (!hasPermission) {
    return response.status(403).json({ error: "Unauthorized" });
  }
  response.json({
    message: "You have access to the protected endpoint",
  });
});

// Product model routes

router.get("/products", async (_request, response) => {
  const products = await Product.findAll();
  response.json(products);
});

router.get("/products/:sku", async ({ params }, response) => {
  const product = await Product.findOne({ where: { sku: params.sku } });
  response.json(product);
});

router.post("/products", middleware, async (request, response) => {
  const product = await Product.create(request.body);
  response.json(product);
});

router.put("/products/:sku", middleware, async ({ params }, response) => {
  const product = await Product.findOne({
    where: {
      sku: params.sku,
    },
  });
  if (product) {
    await product.update(request.body);
    response.json(product);
  } else {
    response.status(404).json({ message: "Product not found" });
  }
});

router.delete("/products/:sku", middleware, async ({ params }, response) => {
  const product = await Product.findOne({
    where: {
      sku: params.sku,
    },
  });
  if (product) {
    await product.destroy();
    response.json({ message: "Product deleted" });
  } else {
    response.status(404).json({ message: "Product not found" });
  }
});

// Inventory model routes

router.get("/inventories", async (_request, response) => {
  const inventories = await Inventory.findAll();
  response.json(inventories);
});

router.get("/inventories/:name", async ({ params }, response) => {
  const inventory = await Inventory.findOne({
    where: { name: params.name },
  });
  response.json(inventory);
});

module.exports = router;
