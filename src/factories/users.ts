import { CreateUserController } from "../controllers/users/create-user";
import { CreateUserRepository } from "../repositories/user/create-user";
import { CreateUserUseCase } from "../use-cases/users/create-user";

export const createUserFactory = () => {
  const createUserRepository = new CreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(createUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
