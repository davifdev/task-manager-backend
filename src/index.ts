import express from "express";

import {
  createTaskFactory,
  deleteTaskFactory,
  getTasksFactory,
} from "./factories/tasks";
import { createUserFactory } from "./factories/users";

const app = express();
app.use(express.json());

app.get("/api/tasks", async (request, response) => {
  const getTasksController = getTasksFactory();

  const { body, statusCode } = await getTasksController.execute();

  response.status(statusCode).json(body);
});

app.post("/api/tasks", async (request, response) => {
  const createTaskController = createTaskFactory();

  const { body, statusCode } = await createTaskController.execute(request);

  response.status(statusCode).json(body);
});

app.post("/api/users", async (request, response) => {
  const createUserController = createUserFactory();

  const { body, statusCode } = await createUserController.execute(request);

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
