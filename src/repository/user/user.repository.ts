import type { User } from '../../../generated/prisma/browser';
import type { PrismaClient } from '../../../generated/prisma/client';
import { db } from '../../../lib/prisma';
import type { IUserRepository } from './user.contract';

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
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
}

export const userRepository: IUserRepository = new UserRepository(db);
