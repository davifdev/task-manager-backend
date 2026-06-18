import { userParams } from "../__tests__/user";
import { app } from "../app";
import request from "supertest";

describe("UsersRoutes (e2e)", () => {
  it("POST /api/users/signup should return 201 when user is created", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(userParams);

    expect(response.status).toBe(201);
  });

  it("POST /api/users/signin should return 200 when user logged", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    const response = await request(app).post("/api/users/signin").send({
      email: user.body.email,
      password: userParams.password,
    });

    expect(response.status).toBe(200);
  });

  it("POST /api/users/refresh-token return 200 when tokens is refresh", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    const response = await request(app)
      .post("/api/users/refresh-token")
      .send({ refreshToken: user.body.tokens.refreshToken });

    expect(response.status).toBe(200);
  });
});
