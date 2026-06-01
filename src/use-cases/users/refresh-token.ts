import "dotenv/config";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";

export class RefreshTokenUseCase {
  async execute(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_KEY as string,
    ) as { userId: string };

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
