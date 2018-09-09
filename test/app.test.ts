import request from "supertest";

import { MongoClient, Db } from "mongodb";

import { server } from "../src/index";
import { productList } from "./helpers/productList";

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
});