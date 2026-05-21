import crypto from "crypto";
import { CreateUserRepository } from "../../repositories/user/create-user";
import type { BodyParamsCreateUser } from "../../models/users/create-user";

export class CreateUserUseCase {
  private readonly createUserRepository;

  constructor(createUserRepository: CreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async execute(createUserParams: BodyParamsCreateUser) {
    const user_id = crypto.randomUUID();

    const params = {
      ...createUserParams,
      userId: user_id,
    };

    const result = await this.createUserRepository.execute(params);

    return result;
  }
}
