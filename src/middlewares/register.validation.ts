import type { NextFunction, Request, Response } from 'express';
import { registerSchema } from '../schemas/register.schema';

export const validateResgister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationObj = registerSchema.safeParse(req.body);
  if (!validationObj.success) {
    return res.status(400).send({ errors: validationObj.error.issues });
  }

  res.status(200).send({ message: 'Validation successful' });

  next();
};
