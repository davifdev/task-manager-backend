import {
  createTaskService,
  deleteAllTasksService,
  deleteTaskService,
  getAllTasksServices,
  listAllTasksServices,
  updateTaskService,
  updateTaskStatusService,
} from '../services/tasks.service';
import type { Request, Response } from 'express';

const getAllTasksController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return;

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

const listAllTasksController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return;

  try {
    const tasks = await listAllTasksServices(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching all tasks.',
    });
  }
};

const createTaskController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return;

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

const deleteTaskController = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;
  if (!taskId) return;

  try {
    await deleteTaskService(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'error occurred while deleting task.',
    });
  }
};

const deleteAllTasksController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return;

  try {
    await deleteAllTasksService(userId);
    res.status(200).json({ message: 'All tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'error occurred while deleting all task.',
    });
  }
};

const updateTaskController = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;
  const userId = req.userId;
  const data = req.body;
  if (!userId) return;

  try {
    await updateTaskService(taskId, data, userId);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'error occurred while updating task.',
    });
  }
};

const updateTaskStatusController = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;
  const { status } = req.body;
  if (!taskId || !status) return;
  try {
    await updateTaskStatusService(taskId, status);
    res.status(200).json({ message: 'Task status updated successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'error occurred while updating status task.',
    });
  }
};

export {
  getAllTasksController,
  createTaskController,
  deleteTaskController,
  deleteAllTasksController,
  updateTaskController,
  updateTaskStatusController,
  listAllTasksController,
};
