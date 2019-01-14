const users = require('../routes/usersRoutes');
const request = require('supertest'); 


describe("server.js", () => {
    it("runs the test", () => {
      expect(true).toBeTruthy();
    });
    describe("GET /", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(users).get("/");
        expect(response.status).toEqual(200);
      });
      it('should return list of users', async () => {
        const response = await request(users).get("/");
        const expectedBody =[
          { id: 0, user: "" },
          { id: 1, user: "" }
        ];
        expect(response.body).toEqual(expectedBody);
      });
      it("should return JSON ", async () => {
        const response = await request(users).get("/");
        expect(response.type).toEqual("application/json");
      });
    });
    describe("POST /", () => {
      it("should return a user", async () => {
        const response = await request(users)
          .post("/")
          .send({
              user: "" 
          });
        const expectedBody = [
          { id: 0, user: "" },
          { id: 1, user: "" },
          { id: 2, user: "" }
        ];
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expectedBody);
      });
    });
    describe("DELETE //:id", () => {
      it("should delete the user with passed in id", async () => {
        const response = await request(users).delete("/3");
        const body = [
        { id: 0, user: "" },
        { id: 1, user: "" },
        { id: 2, user: "" },
        { id: 3, user: "" }
        ];
        expect(response.body).toEqual({ user: body });
      });
    });
  });