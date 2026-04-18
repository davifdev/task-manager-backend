import {
  createTaskService,
  getAllTasksServices,
} from '../services/tasks.service';
import type { Request, Response } from 'express';

const getAllTasksController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const tasks = await getAllTasksServices(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching tasks.',
    });
  }
};

const createTaskController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const data = req.body;

  try {
    await createTaskService(data, userId);
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'error occurred while creating task.',
    });
  }
};

export { getAllTasksController, createTaskController };
