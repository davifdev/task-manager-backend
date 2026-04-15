import type { Request, Response } from 'express';
import { registerService } from '../services/auth.service';

export const registerController = async (req: Request, res: Response) => {
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
