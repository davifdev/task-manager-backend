import type { NextFunction, Request, Response } from 'express';
import { createTaskSchema } from '../schemas/createTask.schema';

export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationObj = createTaskSchema.safeParse(req.body);
  if (!validationObj.success) {
    return res.status(400).send({ errors: validationObj.error.issues });
  }

  res.status(200).send({ message: 'Validation successful' });

  next();
};
