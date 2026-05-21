import express from "express";

import { createTaskFactory } from "./factories/tasks";
import { createUserFactory } from "./factories/users";

const app = express();
app.use(express.json());

app.post("/tasks", async (request, response) => {
  const createTaskController = createTaskFactory();

  const { body, statusCode } = await createTaskController.execute(request);

  response.status(statusCode).json(body);
});

app.post("/users", async (request, response) => {
  const createUserController = createUserFactory();

  const { body, statusCode } = await createUserController.execute(request);

  response.status(statusCode).json(body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
