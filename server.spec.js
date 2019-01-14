const request = require("supertest");
const server = require("./server.js");

 describe("server.js", () => {
  describe("server route", () => {

     it("should return a JSON object fron the index route", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });
  });
});