const request = require("supertest");
const baseURL = "http://localhost:3333";

describe("GET /users", () => {
  it("should be return 200", () => {
    return request(baseURL).get("/users").expect(200);
  });

  it("should return a users list in JSON with id, name and tax with properties", async () => {
    const response = await request(baseURL).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(100);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("tax");
  });
});
