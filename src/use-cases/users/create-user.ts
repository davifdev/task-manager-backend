import { CreateUserRepository } from "../../repositories/user/create-user";
import type {
  BodyParamsCreateUser,
  UserType,
} from "../../models/users/create-user";
import type { GenerateIdAdapter } from "../../adapters/generate-id";
import type { GenerateTokensAdapter } from "../../adapters/generate-tokens";
export class CreateUserUseCase {
  private readonly createUserRepository;
  private readonly generateIdAdapter;
  private readonly generateTokensAdapter;

  constructor(
    createUserRepository: CreateUserRepository,
    generateIdAdapter: GenerateIdAdapter,
    generateTokensAdapter: GenerateTokensAdapter,
  ) {
    this.createUserRepository = createUserRepository;
    this.generateIdAdapter = generateIdAdapter;
    this.generateTokensAdapter = generateTokensAdapter;
  }

  async execute(createUserParams: BodyParamsCreateUser) {
    const user_id = this.generateIdAdapter.execute();

    const params = {
      ...createUserParams,
      id: user_id,
    };

    const result: UserType = await this.createUserRepository.execute(params);

    const tokens = this.generateTokensAdapter.execute(result.id);

    return {
      ...result,
      tokens,
    };
  }
}
