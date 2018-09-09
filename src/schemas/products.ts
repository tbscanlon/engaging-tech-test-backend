import { Schema, model } from "mongoose";

export const ProductSchema = new Schema({
  id: Number,
  name: String,
  category: String,
  price: Number
});

export const ProductModel = model("products", ProductSchema);