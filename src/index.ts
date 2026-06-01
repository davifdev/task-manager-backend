import express from "express";

import {
  createTaskFactory,
  deleteTaskFactory,
  deleteTasksManyFactory,
  getTasksFactory,
  updateTaskFactory,
} from "./factories/tasks";
import {
  createUserFactory,
  loginUserFactory,
  refreshTokenFactory,
} from "./factories/users";
import { authMiddleware } from "./middlewares/auth";

const app = express();
app.use(express.json());

app.get("/api/tasks", authMiddleware, async (request, response) => {
  const getTasksController = getTasksFactory();

  const { body, statusCode } = await getTasksController.execute(request);

  response.status(statusCode).json(body);
});

app.post("/api/tasks", async (request, response) => {
  const createTaskController = createTaskFactory();

  const { body, statusCode } = await createTaskController.execute(request);

  response.status(statusCode).json(body);
});

app.post("/api/users/signin", async (request, response) => {
  const loginUserController = loginUserFactory();

  const { body, statusCode } = await loginUserController.execute(request);

  response.status(statusCode).json(body);
});

app.post("/api/users/signup", async (request, response) => {
  const createUserController = createUserFactory();

  const { body, statusCode } = await createUserController.execute(request);

  response.status(statusCode).json(body);
});

app.post("/api/users/refresh-token", async (request, response) => {
  const refreshTokenController = refreshTokenFactory();

  const { body, statusCode } = await refreshTokenController.execute(request);

  response.status(statusCode).json(body);
});

app.patch("/api/tasks/:taskId", async (request, response) => {
  const updateTaskController = updateTaskFactory();

  const { body, statusCode } = await updateTaskController.execute(request);

  response.status(statusCode).json(body);
});

app.delete("/api/tasks/delete-many", async (request, response) => {
  const deleteTasksManyController = deleteTasksManyFactory();

  const { body, statusCode } = await deleteTasksManyController.execute();

  response.status(statusCode).json(body);
});

app.delete("/api/tasks/:taskId", async (request, response) => {
  const deleteTaskController = deleteTaskFactory();

  const { body, statusCode } = await deleteTaskController.execute(request);

  response.status(statusCode).json(body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
