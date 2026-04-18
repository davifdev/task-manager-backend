import { taskRepository } from '../repository/tasks/tasks.repository';

const getAllTasksServices = async (userId: string) => {
  const tasks = await taskRepository.listTasks(userId);
  return tasks;
};

export { getAllTasksServices };
