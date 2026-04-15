import { Router } from 'express';
import { validateResgister } from '../middlewares/register.validation';
import { registerController } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validateResgister, registerController);

export { router };
