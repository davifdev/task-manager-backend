import { GenerateIdAdapter } from "../adapters/generate-id";
import { GenerateTokensAdapter } from "../adapters/generate-tokens";
import { PasswordCompareAdapter } from "../adapters/password-compare";
import { PasswordHasherAdapter } from "../adapters/password-hasher";
import { VerifyTokenAdapter } from "../adapters/verify-token";
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
  const generateIdAdapter = new GenerateIdAdapter();
  const passwordHasherAdapter = new PasswordHasherAdapter();
  const generateTokensAdapter = new GenerateTokensAdapter();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    generateIdAdapter,
    generateTokensAdapter,
  );
  const createUserController = new CreateUserController(
    createUserUseCase,
    passwordHasherAdapter,
  );

  return createUserController;
};

export const loginUserFactory = () => {
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const generateTokensAdapter = new GenerateTokensAdapter();
  const passwordCompareAdapter = new PasswordCompareAdapter();
  const loginUserUseCase = new LoginUserUseCase(
    getUserByEmailRepository,
    generateTokensAdapter,
    passwordCompareAdapter,
  );
  const loginUserUseController = new LoginUserController(loginUserUseCase);

  return loginUserUseController;
};

export const refreshTokenFactory = () => {
  const generateTokensAdapter = new GenerateTokensAdapter();
  const verifyTokenAdapter = new VerifyTokenAdapter();
  const refreshTokenUseCase = new RefreshTokenUseCase(
    generateTokensAdapter,
    verifyTokenAdapter,
  );
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
  );

  return refreshTokenController;
};
