import type { PrismaClient } from '../../../generated/prisma/client';

type TaskDTO = {
  title: string;
  description: string;
  userId: string;
  status: 'pending' | 'in_progress' | 'completed';
  time: 'morning' | 'afternoon' | 'evening';
};

export class TasksRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createTask(data: TaskDTO) {
    await this.db.task.create({
      data,
    });
  }

  async listTasks(userId: string) {
    await this.db.task.findMany({
      where: {
        userId,
      },
    });
  }

  async updateTask(id: string, data: TaskDTO) {
    await this.db.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTask(id: string) {
    await this.db.task.delete({
      where: {
        id,
      },
    });
  }
}
