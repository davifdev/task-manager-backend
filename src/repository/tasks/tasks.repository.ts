import type { PrismaClient } from '../../../generated/prisma/client';
import { db } from '../../../lib/prisma';

export type TaskDTO = {
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

  async listTasks(id: string) {
    const tasks = await this.db.task.findMany({
      where: {
        id,
      },
    });

    const morningTasks = tasks.filter(task => task.time === 'morning');
    const afternoonTasks = tasks.filter(task => task.time === 'afternoon');
    const eveningTasks = tasks.filter(task => task.time === 'evening');

    return {
      morning: morningTasks,
      afternoon: afternoonTasks,
      evening: eveningTasks,
    };
  }

  async listAllTasks(id: string) {
    return await this.db.task.findMany({
      where: {
        id,
      },
    });
  }

  async listUniqueTask(id: string) {
    return await this.db.task.findUnique({
      where: {
        id,
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

  async updateTaskStatus(id: string, status: string) {
    await this.db.task.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async deleteTask(id: string) {
    await this.db.task.delete({
      where: {
        id,
      },
    });
  }

  async deleteAllTasks(id: string) {
    await this.db.task.deleteMany({
      where: {
        id,
      },
    });
  }
}

export const taskRepository = new TasksRepository(db);
