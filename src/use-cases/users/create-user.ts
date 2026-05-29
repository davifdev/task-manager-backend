import "dotenv/config";
import crypto from "crypto";
import { CreateUserRepository } from "../../repositories/user/create-user";
import type {
  BodyParamsCreateUser,
  UserType,
} from "../../models/users/create-user";
import jwt from "jsonwebtoken";

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

    const accessToken = jwt.sign(
      { userId: result.id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = jwt.sign(
      { userId: result.id },
      process.env.SECRET_REFRESH_KEY as string,
      {
        expiresIn: "15d",
      },
    );

    return {
      ...result,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
