import { CreateTaskController } from "../controllers/tasks/create-task";
import { DeleteTaskController } from "../controllers/tasks/delete-task";
import { DeleteTasksManyController } from "../controllers/tasks/delete-task-many";
import { GetTasksController } from "../controllers/tasks/get-task";
import { UpdateTaskController } from "../controllers/tasks/update-task";
import { CreateTaskRepository } from "../repositories/tasks/create-task";
import { DeleteTaskRepository } from "../repositories/tasks/delete-task";
import { DeleteTasksManyRepository } from "../repositories/tasks/delete-task-many";
import { GetTasksRepository } from "../repositories/tasks/get-task";
import { UpdateTaskRepository } from "../repositories/tasks/update-task";
import { CreateTaskUseCase } from "../use-cases/tasks/create-task";
import { DeleteTaskUseCase } from "../use-cases/tasks/delete-task";
import { DeleteTasksManyUseCase } from "../use-cases/tasks/delete-task-many";
import { GetTasksUseCase } from "../use-cases/tasks/get-task";
import { UpdateTaskUseCase } from "../use-cases/tasks/update-task";

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

export const updateTaskFactory = () => {
  const updateTaskRepository = new UpdateTaskRepository();
  const updateTaskUseCase = new UpdateTaskUseCase(updateTaskRepository);
  const updateTaskController = new UpdateTaskController(updateTaskUseCase);

  return updateTaskController;
};

export const deleteTaskFactory = () => {
  const deleteTaskRepository = new DeleteTaskRepository();
  const deleteTaskUseCase = new DeleteTaskUseCase(deleteTaskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

  return deleteTaskController;
};

export const deleteTasksManyFactory = () => {
  const deleteTasksManyRepository = new DeleteTasksManyRepository();
  const deleteTasksManyUseCase = new DeleteTasksManyUseCase(
    deleteTasksManyRepository,
  );
  const deleteTasksManyController = new DeleteTasksManyController(
    deleteTasksManyUseCase,
  );

  return deleteTasksManyController;
};
