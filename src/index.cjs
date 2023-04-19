const express = require("express");

const routes = require("./routes.cjs");
const port = require("./config.cjs").port;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
