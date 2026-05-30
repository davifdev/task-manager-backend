import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = request.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return response.status(401).json({
        message: "token not found",
      });
    }

    const tokenPayload = jwt.verify(
      accessToken,
      process.env.SECRET_KEY as string,
    ) as { userId: string };

    request.userId = tokenPayload.userId;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ message: error.message });
    }
  }
};
