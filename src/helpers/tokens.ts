import 'dotenv/config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.SECRET_REFRESH_KEY!, {
    expiresIn: '30d',
  });
};

export const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
