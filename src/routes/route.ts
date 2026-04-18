import { Router } from 'express';
import { validateResgister } from '../middlewares/register.validation';
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from '../controllers/auth.controller';
import { validateLogin } from '../middlewares/login.validation';
import { authMiddleware } from '../middlewares/auth';
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  updateTaskController,
} from '../controllers/tasks.controller';
import { validateCreateTask } from '../middlewares/createTask.validation';
import { validateUpdateTask } from '../middlewares/updateTask.validation';

const router = Router();

// Authentication routes
router.post('/register', validateResgister, registerController);
router.post('/login', validateLogin, loginController);
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);

// Task routes
router.get('/tasks', authMiddleware, getAllTasksController);
router.post('/tasks', authMiddleware, validateCreateTask, createTaskController);
router.delete('/tasks/:id', authMiddleware, deleteTaskController);
router.put(
  '/tasks/:id',
  authMiddleware,
  validateUpdateTask,
  updateTaskController,
);

export { router };
