import type { User } from '../../../generated/prisma/browser';
import type { CreateUserDTO } from './user.repository';

export interface IUserRepository {
  create: (data: CreateUserDTO) => Promise<User>;
}
