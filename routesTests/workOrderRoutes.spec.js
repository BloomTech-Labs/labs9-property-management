const orders = require('../routes/workOrderRoutes');
const request = require('supertest'); 

describe("server.js", () => {
    it("runs the test", () => {
      expect(true).toBeTruthy();
    });
    describe("GET /", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(orders).get("/");
        expect(response.status).toEqual(200);
      });
      it('should return list of orders', async () => {
        const response = await request(orders).get("/");
        const expectedBody =[
          { id: 0, order: "" },
          { id: 1, order: "" }
        ];
        expect(response.body).toEqual(expectedBody);
      });
      it("should return JSON ", async () => {
        const response = await request(orders).get("/");
        expect(response.type).toEqual("application/json");
      });
    });
    describe("POST /", () => {
      it("should return a order", async () => {
        const response = await request(orders)
          .post("/")
          .send({
              order: "" 
          });
        const expectedBody = [
          { id: 0, order: "" },
          { id: 1, order: "" },
          { id: 2, order: "" }
        ];
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expectedBody);
      });
    });
    describe("DELETE //:id", () => {
      it("should delete the passed in id of order", async () => {
        const response = await request(order).delete("/2");
        const body = [
        { id: 0, order: "" },
        { id: 1, order: "" },
        { id: 2, order: "" }
        ];
        expect(response.body).toEqual({ order : body });
      });
    });
  });
