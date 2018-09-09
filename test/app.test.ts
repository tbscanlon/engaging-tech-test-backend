import request from "supertest";
import { MongoClient, Db } from "mongodb";

import { server } from "../src/index";
import { productList } from "./helpers/productList";
import { orderList } from "./helpers/orderList";
import { NO_ID_ERROR } from "../src/controllers/orders";

describe("App", () => {
  let connection: MongoClient;
  let res: request.Response;

  beforeEach(async () => {
    connection = await MongoClient.connect("mongodb://tb:123secure@ds249992.mlab.com:49992/engaging-tech-test");
  });

  afterEach(async () => {
    server.close();
    await connection.close();
  });

  describe("GET /", () => {
    it("Returns a 404 error", async () => {
      res = await request(server).get("/");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /products", () => {
    beforeEach(async () => {
      res = await request(server).get("/products");
    });

    it("Returns a 200 OK response", async () => {
      expect(res.status).toBe(200);
    });

    it("Returns a list of products from the database", () => {
      expect(res.body).toEqual(productList);
    });
  });

  describe("GET /products/:id", () => {
    describe("With a valid product ID", () => {
      beforeEach(async () => {
        res = await request(server).get(`/products/${productList[0].id}`);
      });

      it("Returns a 200 OK response", () => {
        expect(res.status).toBe(200);
      });

      it("Returns the product matching the ID", () => {
        expect(res.body).toEqual(productList[0]);
      });
    });

    describe("With an invalid product ID", () => {
      it("Returns a 404 error", async () => {
        res = await request(server).get("/products/very wrong");
        expect(res.status).toBe(404);
      });
    });
  });

  describe("GET /orders", () => {
    beforeEach(async () => {
      res = await request(server).get("/orders");
    });

    it("Returns a 400 error", () => {
      expect(res.status).toBe(400);
    });

    it("Includes a helpful error message as the response body", () => {
      expect(res.body).toBe(NO_ID_ERROR);
    });
  });

  describe("GET /orders/:id", () => {
    describe("With a valid order ID", () => {
      beforeEach(async () => {
        res = await request(server).get(`/orders/${orderList.id}`);
      });

      it("Returns a 200 OK response", () => {
        expect(res.status).toBe(200);
      });

      it("Returns the matching order the request ID", () => {
        expect(res.body).toEqual(orderList);
      });
    });

    describe("With an invalid order ID", () => {
      it("Returns a 404 error", async () => {
        res = await request(server).get("/orders/very wrong");
        expect(res.status).toBe(404);
      });
    });
  });
});