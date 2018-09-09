import { Router, Request, Response } from "express";

export const products = Router();

products.get("/", (req: Request, res: Response) => {
  res.json({product: 10001});
});