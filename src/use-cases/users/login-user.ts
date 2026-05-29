import bcrypt from "bcrypt";
import {
  EmailOrPasswordIsInvalid,
  UserNotFoundError,
} from "../../helpers/errors";
import type { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email";
import type { LoginParams, UserType } from "../../models/users/create-user";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";

export class LoginUserUseCase {
  private readonly getUserByEmailRepository;

  constructor(getUserByEmailRepository: GetUserByEmailRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository;
  }

  async execute(loginParams: LoginParams) {
    const { email, password } = loginParams;

    const user: UserType = await this.getUserByEmailRepository.execute(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new EmailOrPasswordIsInvalid();
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
      ...user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
