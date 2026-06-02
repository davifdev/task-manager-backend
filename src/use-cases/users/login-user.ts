import {
  EmailOrPasswordIsInvalid,
  UserNotFoundError,
} from "../../helpers/errors";
import type { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email";
import type { LoginParams, UserType } from "../../models/users/create-user";
import type { GenerateTokensAdapter } from "../../adapters/generate-tokens";
import type { PasswordCompareAdapter } from "../../adapters/password-compare";

export class LoginUserUseCase {
  private readonly getUserByEmailRepository;
  private readonly generateTokensAdapter;
  private readonly passwordCompareAdapter;

  constructor(
    getUserByEmailRepository: GetUserByEmailRepository,
    generateTokensAdapter: GenerateTokensAdapter,
    passwordCompareAdapter: PasswordCompareAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.generateTokensAdapter = generateTokensAdapter;
    this.passwordCompareAdapter = passwordCompareAdapter;
  }

  async execute(loginParams: LoginParams) {
    const { email, password } = loginParams;

    const user: UserType = await this.getUserByEmailRepository.execute(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    const passwordCompare = await this.passwordCompareAdapter.execute(
      password,
      user.password,
    );

    if (!passwordCompare) {
      throw new EmailOrPasswordIsInvalid();
    }

    const tokens = this.generateTokensAdapter.execute(user.id);

    return {
      ...user,
      tokens,
    };
  }
}
