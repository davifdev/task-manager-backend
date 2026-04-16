import { Router } from 'express';
import { validateResgister } from '../middlewares/register.validation';
import {
  loginController,
  refreshTokenController,
  registerController,
} from '../controllers/auth.controller';
import { validateLogin } from '../middlewares/login.validation';

const router = Router();

router.post('/register', validateResgister, registerController);
router.post('/login', validateLogin, loginController);
router.post('/refresh-token', refreshTokenController);

export { router };
