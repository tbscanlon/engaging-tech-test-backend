import { Server } from "http";
import request from "supertest";

import { server } from "../src/index";

describe("App", () => {
  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("Returns a 404 error", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /products", () => {
    it("Returns a 404 error", async () => {
      const res = await request(server).get("/products");
      expect(res.status).toBe(404);
    });
  });
});