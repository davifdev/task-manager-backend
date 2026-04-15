import type { Request, Response } from 'express';
import { loginService, registerService } from '../services/auth.service';

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, tokens } = await registerService(req.body);
    res.status(201).json({
      email,
      tokens,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const loginResult = await loginService(req.body);
    if (!loginResult) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    res.status(200).json({
      message: 'Login Succesfuly',
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

export { registerController, loginController };
