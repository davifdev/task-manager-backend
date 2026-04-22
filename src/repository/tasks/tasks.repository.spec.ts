/* eslint-disable @typescript-eslint/no-explicit-any */
import { prismaMock } from '../../__tests__/setup';
import { taskRepository, type TaskDTO } from './tasks.repository';

describe('TasksRepository (unit)', () => {
  describe('createTask', async () => {
    it('deve chamar o prisma.create com os dados corretos', async () => {
      const taskData: TaskDTO = {
        title: 'test task',
        description: 'test description',
        userId: 'user123',
        status: 'pending',
        time: 'morning',
      };

      await taskRepository.createTask(taskData);

      expect(prismaMock.task.create).toHaveBeenCalledWith({
        data: taskData,
      });
    });
  });
  describe('listTasks', async () => {
    it('deve filtrar e agrupar as tarefas por período corretamente', async () => {
      const userId = 'user123';
      const mockTasks = [
        { id: '1', title: 'Task 1', time: 'morning', userId },
        { id: '2', title: 'Task 2', time: 'afternoon', userId },
        { id: '3', title: 'Task 3', time: 'evening', userId },
        { id: '4', title: 'Task 4', time: 'evening', userId },
      ];

      prismaMock.task.findMany.mockResolvedValue(mockTasks as any);

      const result = await taskRepository.listTasks(userId);

      expect(prismaMock.task.findMany).toHaveBeenCalledWith({
        where: { userId },
      });

      expect(result.morning).toHaveLength(1);
      expect(result.afternoon).toHaveLength(1);
      expect(result.evening).toHaveLength(2);
    });
  });
  describe('updateTaskStatus', async () => {
    it('deve atualizar apenas o status da tarefa', async () => {
      const taskId = 'user123';
      const newStatus = 'in_progress';

      await taskRepository.updateTaskStatus(taskId, newStatus);

      expect(prismaMock.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: { status: newStatus },
      });
    });
  });
  describe('deleteAllTasks', () => {
    it('deve deletar todas as tarefas do usuário informado', async () => {
      const userId = 'user123';

      await taskRepository.deleteAllTasks(userId);

      expect(prismaMock.task.deleteMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });
});
