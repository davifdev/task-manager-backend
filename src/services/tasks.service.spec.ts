/* eslint-disable @typescript-eslint/no-explicit-any */
import { taskRepository } from '../repository/tasks/tasks.repository';
import {
  createTaskService,
  deleteAllTasksService,
  deleteTaskService,
  getAllTasksServices,
  listAllTasksServices,
  updateTaskService,
  updateTaskStatusService,
} from './tasks.service';

vi.mock('../repository/tasks/tasks.repository', () => ({
  taskRepository: {
    createTask: vi.fn(),
    listTasks: vi.fn(),
    updateTask: vi.fn(),
    updateTaskStatus: vi.fn(),
    deleteTask: vi.fn(),
    deleteAllTasks: vi.fn(),
    listAllTasks: vi.fn(),
  },
}));

describe('tasksServices (unit)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const taskId = 'task_id';
  const userId = 'user_id';
  const taskExample: any = {
    title: 'any-title',
    time: 'morning',
    status: 'pending',
    description: 'any-description',
  };

  describe('getAllTasksServices', () => {
    it('deve chamar getAllTasksServies com os valores corretos', async () => {
      await getAllTasksServices(userId);

      expect(taskRepository.listTasks).toHaveBeenCalledWith(userId);
    });
  });

  describe('createTaskService', () => {
    it('deve chamar createTasksService com os valores corretos', async () => {
      await createTaskService(taskExample, userId);

      expect(taskRepository.createTask).toHaveBeenCalledWith({
        ...taskExample,
        userId,
      });
    });
  });

  describe('deleteTasksService', () => {
    it('deve chamar deleteTasksService com os valores corretos', async () => {
      await deleteTaskService(taskId);

      expect(taskRepository.deleteTask).toHaveBeenCalledWith(taskId);
    });
  });

  describe('deleteAllTasksService', () => {
    it('deve chamar deleteAllTasksService com os valores corretos', async () => {
      await deleteAllTasksService(userId);

      expect(taskRepository.deleteAllTasks).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateTasksService', () => {
    it('deve chamar updateTasksService com os valores corretos', async () => {
      await updateTaskService(taskId, taskExample, userId);

      expect(taskRepository.updateTask).toHaveBeenCalledWith(taskId, {
        ...taskExample,
        userId,
      });
    });
  });

  describe('updateTasksStatusService', () => {
    const status = 'in_progress';
    it('deve chamar updateTasksServiceStatus com os valores corretos', async () => {
      await updateTaskStatusService(taskId, status);

      expect(taskRepository.updateTaskStatus).toHaveBeenCalledWith(
        taskId,
        status,
      );
    });
  });

  describe('listAllTasksService', () => {
    it('deve chamar listAllTasksServices com os valores corretos', async () => {
      await listAllTasksServices(userId);

      expect(taskRepository.listAllTasks).toHaveBeenCalledWith(userId);
    });
  });
});
