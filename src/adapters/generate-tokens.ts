import "dotenv/config";
import jwt from "jsonwebtoken";

export class GenerateTokensAdapter {
  execute(userId: string) {
    return {
      accessToken: jwt.sign({ userId }, process.env.SECRET_KEY as string, {
        expiresIn: "15m",
      }),
      refreshToken: jwt.sign(
        { userId },
        process.env.SECRET_REFRESH_KEY as string,
        {
          expiresIn: "15d",
        },
      ),
    };
  }
}
