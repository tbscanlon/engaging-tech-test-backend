import express from "express";
import mongoose from "mongoose";
import { Server } from "http";

import { products } from "./controllers/products";
import { orders } from "./controllers/orders";

const PORT = 8080;
const MONGO_URL = "mongodb://tb:123secure@ds249992.mlab.com:49992/engaging-tech-test";

const app = express();

const setupRoutes = () => {
  app.use("/products", products);
  app.use("/orders", orders);
};

const setupDb = (url = MONGO_URL) => {
  mongoose.connect(url);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

setupDb();
setupRoutes();

export const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
