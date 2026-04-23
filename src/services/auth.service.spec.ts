/* eslint-disable @typescript-eslint/no-explicit-any */
import { userRepository } from '../repository/user/user.repository';
import { registerService } from './auth.service';
import bcrypt from 'bcryptjs';

vi.mock('../repository/user/user.repository', () => ({
  userRepository: {
    create: vi.fn(),
    refreshToken: vi.fn(),
  },
}));

vi.mock('../helpers/tokens', () => ({
  generateAccessToken: vi.fn().mockReturnValue('access_token'),
  generateRefreshToken: vi.fn().mockReturnValue('refresh_token'),
  hashToken: vi.fn().mockReturnValue('hashedRefreshToken'),
}));

vi.mock('bcryptjs', () => ({
  default: {
    hashSync: vi.fn().mockReturnValue('hashedPassword'),
  },
}));

vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('generated_uuid'),
}));

describe('AuthService (unit)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerService', async () => {
    it('deve registrar um novo usuário e retornar os tokens', async () => {
      const newUser = {
        username: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const userReturn = { id: 'user_id', ...newUser };
      vi.mocked(userRepository.create).mockResolvedValue(userReturn as any);
      vi.mocked(userRepository.refreshToken).mockResolvedValue(
        userReturn as any,
      );

      const result = await registerService(newUser);

      expect(bcrypt.hashSync).toHaveBeenCalledWith('password123', 10);

      expect(userRepository.create).toHaveBeenCalledWith({
        username: newUser.username,
        email: newUser.email,
        password: 'hashedPassword',
      });

      expect(userRepository.refreshToken).toHaveBeenCalledWith(
        expect.objectContaining({
          tokenHash: 'hashedRefreshToken',
          userId: 'user_id',
          familyId: 'generated_uuid',
        }),
      );

      expect(result).toEqual({
        email: newUser.email,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });
    });
  });
});
