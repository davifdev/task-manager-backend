/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUserParams, tokensReturn, user } from "../../__tests__/user";
import {
  EmailOrPasswordIsInvalid,
  UserNotFoundError,
} from "../../helpers/errors";
import { LoginUserUseCase } from "./login-user";

describe("LoginUserUseCase", () => {
  class GetUserByEmailRepositoryStub {
    async execute() {
      return user;
    }
  }

  class GenerateTokensAdapterStub {
    execute() {
      return tokensReturn;
    }
  }

  class PasswordCompareAdapterStub {
    async execute() {
      return "password_hasher";
    }
  }

  const makeSut = () => {
    const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
    const generateTokensAdapter = new GenerateTokensAdapterStub();
    const passwordCompareAdapter = new PasswordCompareAdapterStub();
    const sut = new LoginUserUseCase(
      getUserByEmailRepository as any,
      generateTokensAdapter as any,
      passwordCompareAdapter as any,
    );

    return {
      sut,
      getUserByEmailRepository,
      generateTokensAdapter,
      passwordCompareAdapter,
    };
  };

  it("should logged user with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(loginUserParams);

    expect(response).toStrictEqual({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      tokens: {
        ...tokensReturn,
      },
    });
  });

  it("should throw UserNotFoundError if throws", async () => {
    const { sut, getUserByEmailRepository } = makeSut();

    vi.spyOn(getUserByEmailRepository, "execute").mockImplementation(() => {
      throw new UserNotFoundError(loginUserParams.email);
    });

    const promise = sut.execute(loginUserParams);

    expect(promise).rejects.toThrow(
      new UserNotFoundError(loginUserParams.email),
    );
  });

  it("should throw EmailOrPasswordIsInvaid if throws", async () => {
    const { sut, getUserByEmailRepository } = makeSut();

    vi.spyOn(getUserByEmailRepository, "execute").mockImplementation(() => {
      throw new EmailOrPasswordIsInvalid();
    });

    const promise = sut.execute(loginUserParams);

    expect(promise).rejects.toThrow(new EmailOrPasswordIsInvalid());
  });
});
