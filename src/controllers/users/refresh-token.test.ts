/* eslint-disable @typescript-eslint/no-explicit-any */
import { refreshTokenReturn } from "../../__tests__/user";
import { RefreshTokenController } from "./refresh-token";

describe("RefreshTokenController", async () => {
  class RefreshTokenUseCaseStub {
    async execute() {
      return refreshTokenReturn;
    }
  }

  const makeSut = () => {
    const refreshTokenUseCase = new RefreshTokenUseCaseStub();
    const sut = new RefreshTokenController(refreshTokenUseCase as any);

    return {
      sut,
      refreshTokenUseCase,
    };
  };

  const httpRequest = {
    body: {
      refreshToken: "refresh_token",
    },
  };

  it("should return 200 if tokens is refresh with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(200);
  });

  it("should call refreshTokenUseCase with correct params", async () => {
    const { sut, refreshTokenUseCase } = makeSut();

    const refreshTokenSpy = vi
      .spyOn(refreshTokenUseCase, "execute")
      .mockResolvedValue(refreshTokenReturn);

    await sut.execute(httpRequest as any);

    expect(refreshTokenSpy).toHaveBeenCalledWith(httpRequest.body.refreshToken);
  });

  it("should return 500 if occurrs on error", async () => {
    const { sut, refreshTokenUseCase } = makeSut();

    vi.spyOn(refreshTokenUseCase, "execute").mockImplementation(() => {
      throw new Error();
    });

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(500);
  });
});
