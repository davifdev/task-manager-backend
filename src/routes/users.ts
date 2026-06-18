import { Router } from "express";
import {
  createUserFactory,
  loginUserFactory,
  refreshTokenFactory,
} from "../factories/users";

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
