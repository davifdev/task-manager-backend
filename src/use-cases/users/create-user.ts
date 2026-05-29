import crypto from "crypto";
import { CreateUserRepository } from "../../repositories/user/create-user";
import type {
  BodyParamsCreateUser,
  UserType,
} from "../../models/users/create-user";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";

export class CreateUserUseCase {
  private readonly createUserRepository;

  constructor(createUserRepository: CreateUserRepository) {
    this.createUserRepository = createUserRepository;
  }

  async execute(createUserParams: BodyParamsCreateUser) {
    const user_id = crypto.randomUUID();

    const params = {
      ...createUserParams,
      id: user_id,
    };

    const result: UserType = await this.createUserRepository.execute(params);

    const accessToken = generateAccessToken(result.id);
    const refreshToken = generateRefreshToken(result.id);

    return {
      ...result,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
