/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { user } from "../../__tests__/user";
import { GetUserByIdUseCase } from "./get-user-by-id";
import { UserNotFoundError } from "../../helpers/errors";

describe("GetUserByIdUseCase", () => {
  const userId = faker.string.uuid();
  class GetUserByIdRepositoryStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new GetUserByIdUseCase(getUserByIdRepository as any);

    return {
      sut,
      getUserByIdRepository,
    };
  };

  it("should return user with successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(userId);

    expect(response).toStrictEqual(user);
  });

  it("should call GetUserByIdRepository with correct params", async () => {
    const { sut, getUserByIdRepository } = makeSut();

    const getUserByIdStub = vi
      .spyOn(getUserByIdRepository, "execute")
      .mockResolvedValue(user);

    await sut.execute(userId);

    expect(getUserByIdStub).toHaveBeenCalledWith(userId);
  });

  it("should throw UserNotFoundError throws", async () => {
    const { sut, getUserByIdRepository } = makeSut();

    vi.spyOn(getUserByIdRepository, "execute").mockImplementation(() => {
      throw new UserNotFoundError(userId);
    });

    const promise = sut.execute(userId);

    expect(promise).rejects.toThrow(new UserNotFoundError(userId));
  });
});
