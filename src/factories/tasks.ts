import { CreateTaskController } from "../controllers/tasks/create-task";
import { DeleteTaskController } from "../controllers/tasks/delete-task";
import { CreateTaskRepository } from "../repositories/tasks/create-task";
import { DeleteTaskRepository } from "../repositories/tasks/delete-task";
import { CreateTaskUseCase } from "../use-cases/tasks/create-task";
import { DeleteTaskUseCase } from "../use-cases/tasks/delete-task";

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
