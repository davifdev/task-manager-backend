import { CreateTaskController } from "../controllers/tasks/create-task";
import { DeleteTaskController } from "../controllers/tasks/delete-task";
import { GetTasksController } from "../controllers/tasks/get-task";
import { CreateTaskRepository } from "../repositories/tasks/create-task";
import { DeleteTaskRepository } from "../repositories/tasks/delete-task";
import { GetTasksRepository } from "../repositories/tasks/get-task";
import { CreateTaskUseCase } from "../use-cases/tasks/create-task";
import { DeleteTaskUseCase } from "../use-cases/tasks/delete-task";
import { GetTasksUseCase } from "../use-cases/tasks/get-task";

export const getTasksFactory = () => {
  const getTasksRepository = new GetTasksRepository();
  const getTasksUseCase = new GetTasksUseCase(getTasksRepository);
  const getTasksController = new GetTasksController(getTasksUseCase);

  return getTasksController;
};

export const createTaskFactory = () => {
  const createTaskRepository = new CreateTaskRepository();
  const createTaskUseCase = new CreateTaskUseCase(createTaskRepository);
  const createTaskController = new CreateTaskController(createTaskUseCase);

  return createTaskController;
};

export const deleteTaskFactory = () => {
  const deleteTaskRepository = new DeleteTaskRepository();
  const deleteTaskUseCase = new DeleteTaskUseCase(deleteTaskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

  return deleteTaskController;
};
