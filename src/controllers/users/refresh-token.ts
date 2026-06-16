import { type Request } from "express";
import type { RefreshTokenUseCase } from "../../use-cases/users/refresh-token";
import { ok, serverError, unauthorized } from "../helpers/http";
import jwt from "jsonwebtoken";

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
      console.error(error);
      if (error instanceof jwt.JsonWebTokenError) {
        return unauthorized({
          message: error.message,
        });
      }
      return serverError();
    }
  }
}
