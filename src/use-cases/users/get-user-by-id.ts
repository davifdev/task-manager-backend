import { UserNotFoundError } from "../../helpers/errors";
import type { GetUserByIdRepository } from "../../repositories/user/get-user-by-id";

export class GetUserByIdUseCase {
  private readonly getUserByIdRepository;

  constructor(getUserByIdRepository: GetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(userId: string) {
    const result = await this.getUserByIdRepository.execute(userId);

    if (!result) {
      throw new UserNotFoundError(userId);
    }

    return result;
  }
}
