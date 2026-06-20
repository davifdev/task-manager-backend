import { taskExample } from "../__tests__/tasks/create-task";
import { userParams } from "../__tests__/user";
import { app } from "../app";
import request from "supertest";

describe("TasksRoutes (e2e)", () => {
  it("GET /api/tasks when fetching tasks successfully", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`)
      .send({ ...taskExample });

    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });

  it("GET /api/tasks/:taskId when fetching unique task successfully", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    const task = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`)
      .send({ ...taskExample, user_id: user.body.id });

    const response = await request(app)
      .get(`/api/tasks/${task.body.id}`)
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });

  it("POST /api/tasks when created task successfully", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`)
      .send({ ...taskExample, user_id: user.body.id });

    expect(response.status).toBe(201);
  });

  it("PATCH /api/tasks/:taskId when updated task successfully", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    const task = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`)
      .send({ ...taskExample, user_id: user.body.id });

    const response = await request(app)
      .patch(`/api/tasks/${task.body.id}`)
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`)
      .send({ time: "morning" });

    expect(response.status);
  });

  it("DELETE /api/tasks/delete-many when delete all task successfully", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`)
      .send({ ...taskExample, user_id: user.body.id });

    const response = await request(app)
      .delete("/api/tasks/delete-many")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });

  it("DELETE /api/tasks/:taskId when delete task successfully", async () => {
    const user = await request(app).post("/api/users/signup").send(userParams);

    const task = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`)
      .send({ ...taskExample, user_id: user.body.id });

    const response = await request(app)
      .delete(`/api/tasks/${task.body.id}`)
      .set("Authorization", `Bearer ${user.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });
});
