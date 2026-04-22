import type { RefreshToken, User } from '../../../generated/prisma/browser';
import type { CreateUserDTO, RefreshTokenDTO } from './user.repository';
export interface IUserRepository {
  create: (data: CreateUserDTO) => Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  refreshToken(data: RefreshTokenDTO): Promise<RefreshToken>;
  logout: (token: string) => Promise<void>;
}
