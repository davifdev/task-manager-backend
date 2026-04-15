import bcrypt from 'bcryptjs';
import type { RegisterSchema } from '../schemas/register.schema';
import { generateAccessToken, generateRefreshToken } from '../helpers/tokens';
import { userRepository } from '../repository/user/user.repository';

export const registerService = async (body: RegisterSchema) => {
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

export const login = () => {};
