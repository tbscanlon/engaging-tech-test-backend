import express from "express";

import { products } from "./controllers/products";

const PORT = 8080;
const app = express();

app.use("/products", products);

export const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});