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
      const id = 'user123';
      const mockTasks = [
        { idTask: '1', title: 'Task 1', time: 'morning', id },
        { idTask: '2', title: 'Task 2', time: 'afternoon', id },
        { idTask: '3', title: 'Task 3', time: 'evening', id },
        { idTask: '4', title: 'Task 4', time: 'evening', id },
      ];

      prismaMock.task.findMany.mockResolvedValue(mockTasks as any);

      const result = await taskRepository.listTasks(id);

      expect(prismaMock.task.findMany).toHaveBeenCalledWith({
        where: { id },
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
      const id = 'user123';

      await taskRepository.deleteAllTasks(id);

      expect(prismaMock.task.deleteMany).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
  describe('listAllTasks', async () => {
    it('deve listar todas as tarefas', async () => {
      const id = 'user123';
      const mockTasks = [
        { idTask: '1', title: 'Task 1', time: 'morning', id },
        { idTask: '2', title: 'Task 2', time: 'afternoon', id },
        { idTask: '3', title: 'Task 3', time: 'evening', id },
        { idTask: '4', title: 'Task 4', time: 'evening', id },
      ];

      prismaMock.task.findMany.mockResolvedValue(mockTasks as any);

      await taskRepository.listAllTasks(id);

      expect(prismaMock.task.findMany).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
