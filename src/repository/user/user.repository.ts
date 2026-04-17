import { db } from '../../../lib/prisma';
import type { RefreshToken, User } from '../../../generated/prisma/browser';
import type { PrismaClient } from '../../../generated/prisma/client';
import type { IUserRepository } from './user.contract';
import { hashToken } from '../../helpers/tokens';

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type RefreshTokenDTO = {
  id?: string;
  tokenHash: string;
  userId: string;
  familyId: string;
  expiresAt: Date;
};

class UserRepository implements IUserRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create(data: CreateUserDTO): Promise<User> {
    return this.db.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async refreshToken(data: RefreshTokenDTO): Promise<RefreshToken> {
    return this.db.refreshToken.create({
      data,
    });
  }

  async getRefreshToken(hashed: string): Promise<RefreshToken | null> {
    return this.db.refreshToken.findUnique({
      where: {
        tokenHash: hashed,
      },
    });
  }

  async updateManyRefreshToken(storedToken: RefreshTokenDTO) {
    return this.db.refreshToken.updateMany({
      where: { familyId: storedToken.familyId },
      data: { revoked: true },
    });
  }

  async updateRefreshToken(storedToken: RefreshTokenDTO) {
    return this.db.refreshToken.update({
      where: { id: storedToken.id! },
      data: { revoked: true },
    });
  }

  async logout(token: string) {
    await this.db.refreshToken.updateMany({
      where: {
        tokenHash: hashToken(token),
      },
      data: {
        revoked: true,
      },
    });
  }
}

export const userRepository = new UserRepository(db);
