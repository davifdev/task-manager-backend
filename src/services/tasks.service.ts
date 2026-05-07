import { taskRepository } from '../repository/tasks/tasks.repository';
import type { CreateSchemaType } from '../schemas/createTask.schema';
import type { UpdateSchemaType } from '../schemas/updateSchema';

const getAllTasksServices = async (userId: string) => {
  const tasks = await taskRepository.listTasks(userId);
  return tasks;
};

const listAllTasksServices = async (userId: string) => {
  const tasks = await taskRepository.listAllTasks(userId);
  return tasks;
};

const listUniqueTaskServices = async (taskId: string) => {
  const task = await taskRepository.listUniqueTask(taskId);
  return task;
};

const createTaskService = async (data: CreateSchemaType, userId: string) => {
  await taskRepository.createTask({ ...data, userId });
};

const deleteTaskService = async (taskId: string) => {
  await taskRepository.deleteTask(taskId);
};

const deleteAllTasksService = async (userId: string) => {
  await taskRepository.deleteAllTasks(userId);
};

const updateTaskService = async (
  taskId: string,
  data: UpdateSchemaType,
  userId: string,
) => {
  await taskRepository.updateTask(taskId, { ...data, userId });
};

const updateTaskStatusService = async (taskId: string, status: string) => {
  await taskRepository.updateTaskStatus(taskId, status);
};

export {
  getAllTasksServices,
  createTaskService,
  deleteTaskService,
  deleteAllTasksService,
  updateTaskService,
  updateTaskStatusService,
  listAllTasksServices,
  listUniqueTaskServices,
};
