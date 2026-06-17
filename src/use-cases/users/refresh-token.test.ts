/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokensReturn } from "../../__tests__/user";
import { RefreshTokenUseCase } from "./refresh-token";

describe("RefreshTokenController", () => {
  class GenerateTokensAdapterStub {
    execute() {
      return tokensReturn;
    }
  }

  class VerifyTokenAdapterStub {
    async execute() {
      return true;
    }
  }

  const makeSut = () => {
    const generateTokensAdapter = new GenerateTokensAdapterStub();
    const verifyTokenAdapter = new VerifyTokenAdapterStub();
    const sut = new RefreshTokenUseCase(
      generateTokensAdapter as any,
      verifyTokenAdapter as any,
    );

    return {
      sut,
      generateTokensAdapter,
      verifyTokenAdapter,
    };
  };

  const refreshToken = "refresh_token";

  it("should return tokens if refresh with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(refreshToken);

    expect(response).toStrictEqual({
      tokens: {
        ...tokensReturn,
      },
    });
  });
});
