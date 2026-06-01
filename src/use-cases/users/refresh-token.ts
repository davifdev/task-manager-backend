import jwt from "jsonwebtoken";
import { InvalidToken } from "../../helpers/errors";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";

export class RefreshTokenUseCase {
  async execute(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as { userId: string };

    if (!payload) {
      throw new InvalidToken();
    }

    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    return {
      tokens: {
        newAccessToken,
        newRefreshToken,
      },
    };
  }
}
