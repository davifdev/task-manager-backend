import 'dotenv/config';
import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const tokenPayload = jwt.verify(
      accessToken,
      process.env.SECRET_KEY as string,
    ) as { userId: string };

    req.userId = tokenPayload.userId;

    next();
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
