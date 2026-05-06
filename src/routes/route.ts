import { Router } from 'express';
import { validateResgister } from '../middlewares/register.validation';
import {
  getUserController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from '../controllers/auth.controller';
import { validateLogin } from '../middlewares/login.validation';
import { authMiddleware } from '../middlewares/auth';
import {
  createTaskController,
  deleteAllTasksController,
  deleteTaskController,
  getAllTasksController,
  listAllTasksController,
  listUniqueTaskController,
  updateTaskController,
  updateTaskStatusController,
} from '../controllers/tasks.controller';
import { validateCreateTask } from '../middlewares/createTask.validation';
import { validateUpdateTask } from '../middlewares/updateTask.validation';
import { validateUpdateTaskStatus } from '../middlewares/updateTaskStatus.validation';

const router = Router();

// Authentication routes
router.post('/register', validateResgister, registerController);
router.post('/login', validateLogin, loginController);
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);
router.get('/get-user', authMiddleware, getUserController);

// Task routes
router.get('/all-tasks', authMiddleware, listAllTasksController);
router.get('/tasks', authMiddleware, getAllTasksController);
router.get('/tasks/:id', authMiddleware, listUniqueTaskController);
router.post('/tasks', authMiddleware, validateCreateTask, createTaskController);
router.put(
  '/tasks/:id',
  authMiddleware,
  validateUpdateTask,
  updateTaskController,
);
router.patch(
  '/tasks/status/:id',
  authMiddleware,
  validateUpdateTaskStatus,
  updateTaskStatusController,
);
router.delete('/tasks/:id', authMiddleware, deleteTaskController);
router.delete('/tasks', authMiddleware, deleteAllTasksController);

export { router };
