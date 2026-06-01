import { type Request } from "express";
import type { RefreshTokenUseCase } from "../../use-cases/users/refresh-token";
import { ok, unauthorized } from "../../helpers/http";
import { InvalidToken } from "../../helpers/errors";

export class RefreshTokenController {
  private readonly refreshTokenUseCase;

  constructor(refreshTokenUseCase: RefreshTokenUseCase) {
    this.refreshTokenUseCase = refreshTokenUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const params = httpRequest.body;

      const result = await this.refreshTokenUseCase.execute(
        params.refreshToken,
      );

      return ok(result);
    } catch (error) {
      if (error instanceof InvalidToken) {
        return unauthorized({
          message: error.message,
        });
      }
    }
  }
}
