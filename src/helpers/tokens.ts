import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY as string, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.SECRET_REFRESH_KEY as string, {
    expiresIn: "15d",
  });
};
