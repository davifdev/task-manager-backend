import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { serverError, unauthorized } from "../helpers/http";

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = request.headers.authorization?.split(" ")[1];

    const { body, statusCode } = unauthorized({
      message: "the provided token is invalid",
    });

    if (!accessToken) {
      return response.status(statusCode).json(body);
    }

    const tokenPayload = jwt.verify(
      accessToken,
      process.env.SECRET_KEY as string,
    ) as { userId: string };

    request.userId = tokenPayload.userId;

    next();
  } catch (error) {
    console.error(error);
    return serverError();
  }
};
