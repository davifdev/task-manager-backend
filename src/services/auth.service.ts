import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import type { RegisterSchemaType } from '../schemas/register.schema';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from '../helpers/tokens';
import { userRepository } from '../repository/user/user.repository';
import type { LoginSchemaType } from '../schemas/login.schema';
import type { RefreshTokenSchemaType } from '../schemas/refreshToken.schema';
import jwt from 'jsonwebtoken';
import type { LogoutSchemaType } from '../schemas/logout.schema';

const registerService = async (body: RegisterSchemaType) => {
  const { username, email, password } = body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(username, email, password);
  const user = await userRepository.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const familyId = uuidv4();

  await userRepository.refreshToken({
    tokenHash: hashToken(refreshToken),
    userId: user.id,
    familyId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return {
    email,
    username,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const loginService = async (body: LoginSchemaType) => {
  const { email, password } = body;

  const user = await userRepository.findByEmail(email);

  if (!user) {
    return null;
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return null;
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  const familyId = uuidv4();

  await userRepository.refreshToken({
    tokenHash: hashToken(refreshToken),
    userId: user.id,
    familyId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return {
    email,
    username: user.username,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const refreshTokenService = async (body: RefreshTokenSchemaType) => {
  const oldToken = body.refreshToken;

  const errors = {
    error: false,
    status: '',
  };

  if (!oldToken) {
    errors.error = true;
    errors.status = '401';
    return;
  }

  const hashed = hashToken(oldToken);
  const storedToken = await userRepository.getRefreshToken(hashed);

  if (!storedToken) {
    errors.error = true;
    errors.status = '403';
    return;
  }

  if (storedToken.revoked) {
    await userRepository.updateManyRefreshToken(storedToken);
    errors.error = true;
    errors.status = '403';
    return;
  }

  const payload = jwt.verify(oldToken, process.env.SECRET_REFRESH_KEY!) as {
    userId: string;
  };

  if (!payload) {
    errors.error = true;
    errors.status = '403';
    return;
  }

  await userRepository.updateRefreshToken(storedToken);

  const accessToken = generateAccessToken(payload.userId);
  const refreshToken = generateRefreshToken(payload.userId);

  await userRepository.refreshToken({
    tokenHash: hashToken(refreshToken),
    userId: payload.userId,
    familyId: storedToken.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return {
    errors,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const logoutService = async (body: LogoutSchemaType) => {
  const token = body.token;

  if (token) {
    await userRepository.logout(token);
  }

  return {
    message: 'Logged out successfully',
    status: '204',
  };
};

const getUserService = async (userId: string) => {
  const user = await userRepository.getUser(userId);

  return {
    id: user?.id,
    username: user?.username,
    email: user?.email,
  };
};

export {
  registerService,
  loginService,
  refreshTokenService,
  logoutService,
  getUserService,
};
