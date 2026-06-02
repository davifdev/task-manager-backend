import "dotenv/config";
import jwt from "jsonwebtoken";

export class VerifyTokenAdapter {
  async execute(refreshToken: string) {
    return jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_KEY as string,
    ) as { userId: string };
  }
}
