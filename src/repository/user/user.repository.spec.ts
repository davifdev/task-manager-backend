/* eslint-disable @typescript-eslint/no-explicit-any */
import { prismaMock } from '../../__tests__/setup';
import { userRepository } from './user.repository';

describe('UserRepository (unit)', () => {
  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const userData = {
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'hashed_password',
      };

      prismaMock.user.create.mockResolvedValue({
        id: '123',
        ...userData,
      });

      const result = await userRepository.create(userData);

      expect(result).toHaveProperty('id');
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });
  });
  describe('findByEmail', () => {
    it('deve retornar um usuário se o email existir', async () => {
      const email = 'john.doe@example.com';

      prismaMock.user.findUnique.mockResolvedValue({ email } as any);

      const user = await userRepository.findByEmail(email);

      expect(user?.email).toBe(email);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });
  describe('logout', async () => {
    it('deve revogar o token através do hash correto', async () => {
      const rawToken = 'raw_token';

      prismaMock.refreshToken.updateMany.mockResolvedValue({ count: 1 });

      await userRepository.logout(rawToken);

      expect(prismaMock.refreshToken.updateMany).toHaveBeenCalledWith({
        where: {
          tokenHash: expect.any(String),
        },
        data: {
          revoked: true,
        },
      });
    });
  });
  describe('getUser', () => {
    it('deve retornar um usuário referente ao userId', async () => {
      const userId = 'user-123';
      const userReturn = {
        username: 'any-username',
        email: 'any-email',
        password: 'any-password',
      };
      prismaMock.user.findUnique.mockResolvedValue({ userReturn } as any);

      const user = await userRepository.getUser(userId);

      expect(user).toStrictEqual({
        userReturn,
      });
    });
  });
});
