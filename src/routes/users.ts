import { Router } from "express";
import {
  createUserFactory,
  getUserByIdFactory,
  loginUserFactory,
  refreshTokenFactory,
} from "../factories/users";
import { authMiddleware } from "../middlewares/auth";

export const userRouter = Router();

userRouter.post("/signin", async (request, response) => {
  const loginUserController = loginUserFactory();

  const { body, statusCode } = await loginUserController.execute(request);

  response.status(statusCode).json(body);
});

userRouter.post("/signup", async (request, response) => {
  const createUserController = createUserFactory();

  const { body, statusCode } = await createUserController.execute(request);

  response.status(statusCode).json(body);
});

userRouter.post("/refresh-token", async (request, response) => {
  const refreshTokenController = refreshTokenFactory();

  const { body, statusCode } = await refreshTokenController.execute(request);

  response.status(statusCode).json(body);
});

userRouter.get("/get-user", authMiddleware, async (request, response) => {
  const getUserByIdController = getUserByIdFactory();

  const { body, statusCode } = await getUserByIdController.execute(request);

  response.status(statusCode).json(body);
});
