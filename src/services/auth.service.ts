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

const registerService = async (body: RegisterSchemaType) => {
  const { username, email, password } = body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await userRepository.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    email,
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

  const passwordCompare = bcrypt.compare(password, user.password);

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
    expiresAt: new Date(Date.now() * 30 * 24 * 60 * 60 * 1000),
  });

  return {
    email,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export { registerService, loginService };
