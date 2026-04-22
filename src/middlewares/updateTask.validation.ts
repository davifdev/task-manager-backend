import type { NextFunction, Request, Response } from 'express';
import { updateTaskSchema } from '../schemas/updateSchema';

export const validateUpdateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationObj = updateTaskSchema.safeParse(req.body);
  if (!validationObj.success) {
    return res.status(400).send({ errors: validationObj.error.issues });
  }

  next();
};
