const request = require("supertest");
const server = require("./server");

//testing server connection
 describe("server.js", () => {
  describe("/ route", () => {
    it("Should return status 200", async () => {
      let res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
});