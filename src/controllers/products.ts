import { Router, Request, Response } from "express";
import { ProductModel } from "../schemas/products";

export const products = Router();

products.get("/", (req: Request, res: Response) => {
  ProductModel.find({}, (err, documents) => {
    if (err) return console.error(err);
    res.json(documents);
  });
});