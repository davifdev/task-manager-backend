import { CreateUserController } from "../controllers/users/create-user";
import { LoginUserController } from "../controllers/users/login-user";
import { RefreshTokenController } from "../controllers/users/refresh-token";
import { CreateUserRepository } from "../repositories/user/create-user";
import { GetUserByEmailRepository } from "../repositories/user/get-user-by-email";
import { CreateUserUseCase } from "../use-cases/users/create-user";
import { LoginUserUseCase } from "../use-cases/users/login-user";
import { RefreshTokenUseCase } from "../use-cases/users/refresh-token";

export const createUserFactory = () => {
  const createUserRepository = new CreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(createUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};

export const loginUserFactory = () => {
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const loginUserUseCase = new LoginUserUseCase(getUserByEmailRepository);
  const loginUserUseController = new LoginUserController(loginUserUseCase);

  return loginUserUseController;
};

export const refreshTokenFactory = () => {
  const refreshTokenUseCase = new RefreshTokenUseCase();
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
  );

  return refreshTokenController;
};
