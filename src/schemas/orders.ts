import { Schema, model } from "mongoose";

export const OrderSchema = new Schema({
  id: Number,
  products: [{
    id: Number,
    quantity: Number
  }]
});

export const OrderModel = model("orders", OrderSchema);