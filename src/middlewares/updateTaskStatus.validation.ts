import type { NextFunction, Request, Response } from 'express';
import { updateStatusSchema } from '../schemas/updateStatusSchema';

export const validateUpdateTaskStatus = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationObj = updateStatusSchema.safeParse(req.body);
  if (!validationObj.success) {
    return res.status(400).send({ errors: validationObj.error.issues });
  }

  next();
};
