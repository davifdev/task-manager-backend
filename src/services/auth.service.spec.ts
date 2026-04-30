/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { userRepository } from '../repository/user/user.repository';
import {
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from './auth.service';
import bcrypt from 'bcryptjs';

vi.mock('../repository/user/user.repository', () => ({
  userRepository: {
    create: vi.fn(),
    refreshToken: vi.fn(),
    findByEmail: vi.fn(),
    logout: vi.fn(),
    getRefreshToken: vi.fn(),
    updateManyRefreshToken: vi.fn(),
    updateRefreshToken: vi.fn(),
  },
}));

vi.mock('../helpers/tokens', () => ({
  generateAccessToken: vi.fn(() => 'access_token'),
  generateRefreshToken: vi.fn(() => 'refresh_token'),
  hashToken: vi.fn(() => 'hashedRefreshToken'),
}));

vi.mock('bcryptjs', () => ({
  default: {
    hashSync: vi.fn().mockReturnValue('hashedPassword'),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue('generated_uuid'),
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

describe('AuthService (unit)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerService', () => {
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
        username: newUser.username,
        email: newUser.email,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });
    });
  });

  describe('loginService', () => {
    const loginData = {
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const mockUser = {
      userName: 'John Doe',
      id: 'user_id',
      email: 'johndoe@example.com',
      password: 'hashedPassword',
    };

    it('deve logar um novo usuário e retornar os tokens', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);
      const result = await loginService(loginData);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(loginData.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginData.password,
        mockUser.password,
      );

      if (!result) return;

      expect(result).toStrictEqual({
        email: mockUser.email,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });
    });
    it('deve retornar null quando a senha está incorreta', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);
      vi.mocked(bcrypt.compare).mockResolvedValue(false as any);

      const result = await loginService(loginData);

      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginData.password,
        mockUser.password,
      );

      expect(result).toBeNull();
    });
    it('deve retornar null quando o usuário não existe', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      vi.mocked(userRepository.findByEmail).mockResolvedValue(null);

      const result = await loginService(loginData);

      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });

  describe('logoutService', () => {
    it('deve receber um token e o usuário ser deslogado', async () => {
      const token = 'access_token';

      const result = await logoutService({ token });

      expect(result.status).toBe('204');
      expect(result.message).toBe('Logged out successfully');
    });
  });

  describe('refreshTokenService', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('deve retornar erro 401 se o refreshToken não for fornecido', async () => {
      const result = await refreshTokenService({ refreshToken: '' });

      expect(result).toBeUndefined();
    });

    it('deve processar a rota de sucesso e retornar novos tokens', async () => {
      const mockToken = 'valid-token';
      const mockStoredToken = { id: 'family-1', revoked: false };
      const mockPayload = { id: 'user-123' };

      vi.mocked(userRepository.getRefreshToken).mockResolvedValue(
        mockStoredToken as any,
      );
      vi.mocked(jwt.verify).mockReturnValue(mockPayload as any);

      const result = await refreshTokenService({ refreshToken: mockToken });

      expect(result?.tokens).toEqual({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      });

      expect(userRepository.refreshToken).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-123',
          familyId: 'family-1',
        }),
      );
    });

    it('deve revogar todos os tokens se um token já revogado for utilizado', async () => {
      const mockStoredToken = { id: 'family-id', revoked: true };
      vi.mocked(userRepository.getRefreshToken).mockResolvedValue(
        mockStoredToken as any,
      );

      const result = await refreshTokenService({
        refreshToken: 'stolen-token',
      });

      expect(userRepository.updateManyRefreshToken).toHaveBeenCalledWith(
        mockStoredToken,
      );
      expect(result).toBeUndefined();
    });
  });
});
