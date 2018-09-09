import express from "express";
import mongoose from "mongoose";

import { products } from "./controllers/products";

const PORT = 8080;
const MONGO_URL = "mongodb://tb:123secure@ds249992.mlab.com:49992/engaging-tech-test";

// let db: mongoose.Connection;
const app = express();

mongoose.connect(MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/products", products);

export const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});