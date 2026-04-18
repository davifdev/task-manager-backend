import { taskRepository } from '../repository/tasks/tasks.repository';
import type { CreateSchemaType } from '../schemas/getTasks.schema';

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

export { getAllTasksServices, createTaskService, deleteTaskService };
