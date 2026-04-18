import { getAllTasksServices } from '../services/tasks.service';
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

export { getAllTasksController };
