import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createTaskFactory,
  deleteTaskFactory,
  deleteTasksManyFactory,
  getTasksFactory,
  getUniqueTaskFactory,
  updateTaskFactory,
} from "../factories/tasks";

export const tasksRouter = Router();

tasksRouter.get("/", authMiddleware, async (request, response) => {
  const getTasksController = getTasksFactory();

  const { body, statusCode } = await getTasksController.execute(request);

  response.status(statusCode).json(body);
});

tasksRouter.get("/:taskId", authMiddleware, async (request, response) => {
  const getUniqueTaskControler = getUniqueTaskFactory();

  const { body, statusCode } = await getUniqueTaskControler.execute(request);

  response.status(statusCode).json(body);
});

tasksRouter.post("/", authMiddleware, async (request, response) => {
  const createTaskController = createTaskFactory();

  const { body, statusCode } = await createTaskController.execute(request);

  response.status(statusCode).json(body);
});

tasksRouter.patch("/:taskId", authMiddleware, async (request, response) => {
  const updateTaskController = updateTaskFactory();

  const { body, statusCode } = await updateTaskController.execute(request);

  response.status(statusCode).json(body);
});

tasksRouter.delete(
  "/delete-many",
  authMiddleware,
  async (request, response) => {
    const deleteTasksManyController = deleteTasksManyFactory();

    const { body, statusCode } = await deleteTasksManyController.execute();

    response.status(statusCode).json(body);
  },
);

tasksRouter.delete("/:taskId", authMiddleware, async (request, response) => {
  const deleteTaskController = deleteTaskFactory();

  const { body, statusCode } = await deleteTaskController.execute(request);

  response.status(statusCode).json(body);
});
