import { CreateTaskController } from "../controllers/tasks/create-task";
import { CreateTaskRepository } from "../repositories/tasks/create-task";
import { CreateTaskUseCase } from "../use-cases/tasks/create-task";

export const createTaskFactory = () => {
  const createTaskRepository = new CreateTaskRepository();
  const createTaskUseCase = new CreateTaskUseCase(createTaskRepository);
  const createTaskController = new CreateTaskController(createTaskUseCase);

  return createTaskController;
};
