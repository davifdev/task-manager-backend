/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { tokensReturn, user, userParams } from "../../__tests__/user";
import { CreateUserUseCase } from "./create-user";

describe("CreateUserUseCase", () => {
  const idGenerate = faker.string.uuid();
  class CreateUserRepositoryStub {
    async execute() {
      return user;
    }
  }

  class GenerateIdAdapter {
    execute() {
      return idGenerate;
    }
  }

  class GenerateTokensAdapter {
    execute() {
      return tokensReturn;
    }
  }

  const makeSut = () => {
    const createUserRepository = new CreateUserRepositoryStub();
    const generateIdAdapter = new GenerateIdAdapter();
    const generateTokensAdapter = new GenerateTokensAdapter();
    const sut = new CreateUserUseCase(
      createUserRepository as any,
      generateIdAdapter as any,
      generateTokensAdapter as any,
    );
    return {
      sut,
      generateIdAdapter,
      generateTokensAdapter,
      createUserRepository,
    };
  };

  it("should return user with successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(userParams);

    expect(response).toStrictEqual({ ...user, tokens: { ...tokensReturn } });
  });

  it("should call CreateUserRepository with correct params", async () => {
    const { sut, createUserRepository } = makeSut();

    const createUserSpy = vi
      .spyOn(createUserRepository, "execute")
      .mockResolvedValue(user);

    await sut.execute(userParams);

    expect(createUserSpy).toHaveBeenCalledWith({
      ...userParams,
      id: idGenerate,
    });
  });
});
