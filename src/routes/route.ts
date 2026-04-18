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
import { getAllTasksController } from '../controllers/tasks.controller';

const router = Router();

// Authentication routes
router.post('/register', validateResgister, registerController);
router.post('/login', validateLogin, loginController);
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);

// Task routes
router.get('/tasks', authMiddleware, getAllTasksController);

export { router };
