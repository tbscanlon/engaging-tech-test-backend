import { Router, Request, Response } from "express";
import { OrderModel } from "../schemas/orders";

export const NO_ID_ERROR = "Please specify an order ID number.";

export const orders = Router();

orders.get("/", (req: Request, res: Response) => {
  res.status(400);
  res.json(NO_ID_ERROR);
});

orders.get("/:id", (req: Request, res: Response) => {
  OrderModel.findOne(req.params, (err, doc) => {
    if (err) res.status(404);
    res.json(doc);
  });
});