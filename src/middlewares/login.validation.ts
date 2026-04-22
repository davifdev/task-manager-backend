import type { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../schemas/login.schema';

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationObj = loginSchema.safeParse(req.body);
  if (!validationObj.success) {
    return res.status(400).send({ errors: validationObj.error.issues });
  }

  next();
};
