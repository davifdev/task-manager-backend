import express from "express";

import { createTaskFactory } from "./factories/tasks";

const app = express();
app.use(express.json());

app.post("/tasks", async (request, response) => {
  const createTaskController = createTaskFactory();

  const { body, statusCode } = await createTaskController.execute(request);

  response.status(statusCode).json(body);
});
