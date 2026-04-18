import { taskRepository } from '../repository/tasks/tasks.repository';
import type { CreateSchemaType } from '../schemas/createTask.schema';
import type { UpdateSchemaType } from '../schemas/updateSchema';

const getAllTasksServices = async (userId: string) => {
  const tasks = await taskRepository.listTasks(userId);
  return tasks;
};

const createTaskService = async (data: CreateSchemaType, userId: string) => {
  await taskRepository.createTask({ ...data, userId });
};

const deleteTaskService = async (taskId: string) => {
  await taskRepository.deleteTask(taskId);
};

const updateTaskService = async (
  taskId: string,
  data: UpdateSchemaType,
  userId: string,
) => {
  await taskRepository.updateTask(taskId, { ...data, userId });
};

export {
  getAllTasksServices,
  createTaskService,
  deleteTaskService,
  updateTaskService,
};
