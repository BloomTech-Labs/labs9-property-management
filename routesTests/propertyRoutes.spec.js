const properties = require('../routes/propertyRoutes');
const request = require('supertest'); 

describe("server.js", () => {
  it("runs the test", () => {
    expect(true).toBeTruthy();
  });
  describe("GET /", () => {
    it("returns a 200 (OK) status code", async () => {
      const response = await request(properties).get("/");
      expect(response.status).toEqual(200);
    });
    it('should return properties list', async () => {
      const response = await request(properties).get("/");
      const expectedBody =[
        { id: 0, property: "" },
        { id: 1, property: "" }
      ];
      expect(response.body).toEqual(expectedBody);
    });
    it("should return JSON ", async () => {
      const response = await request(properties).get("/");
      expect(response.type).toEqual("application/json");
    });
  });
  describe("POST /", () => {
    it("should return a property", async () => {
      const response = await request(properties)
        .post("/")
        .send({
            property: "" 
        });
      const expectedBody = [
        { id: 0, property: "" },
        { id: 1, property: "" },
        { id: 2, property: "" }
      ];
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expectedBody);
    });
  });
  describe("DELETE //:id", () => {
    it("should delete the passed in id of property", async () => {
      const response = await request(properties).delete("/2");
      const body = [
        { id: 0, property: "" },
        { id: 1, property: "" },
        { id: 2, property: "" }
      ];
      expect(response.body).toEqual({ property: body });
    });
  });
});