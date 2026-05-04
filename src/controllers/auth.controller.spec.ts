import type { Request, Response } from 'express';
import {
  getUserService,
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from '../services/auth.service';
import {
  getUserController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from './auth.controller';

vi.mock('../services/auth.service', () => ({
  registerService: vi.fn(),
  loginService: vi.fn(),
  refreshTokenService: vi.fn(),
  logoutService: vi.fn(),
  getUserService: vi.fn(),
}));

vi.mock('../helpers/tokens', () => ({
  generateAccessToken: vi.fn(() => 'access_token'),
  generateRefreshToken: vi.fn(() => 'refresh_token'),
}));

describe('authController (unit)', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const makeUser = {
    username: 'any-username',
    email: 'any-email',
    password: 'any-password',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      cookies: {},
      body: {},
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      json: vi.fn(),
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    };
  });

  describe('registerContoller', () => {
    it('deve registrar um novo usuário e retornar 201 e accessToken', async () => {
      vi.mocked(registerService).mockResolvedValue({
        username: makeUser.username,
        email: makeUser.email,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });
      mockRequest.body = { makeUser };

      await registerController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(registerService).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.json).toHaveBeenCalledWith({
        username: makeUser.username,
        email: makeUser.email,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });
    });
    it('deve retornar 400 se algum erro acontecer', async () => {
      vi.mocked(registerService).mockImplementation(() => {
        throw new Error('Error');
      });

      await registerController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });
  describe('loginController', () => {
    it('deve retornar erro se os dados do usuário não forem enviados', async () => {
      await loginController(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid email or password',
      });
    });
    it('deve retornar email e accessToken se o usuário logou com sucesso', async () => {
      mockRequest.body = { makeUser };
      vi.mocked(loginService).mockResolvedValue({
        username: makeUser.username,
        email: makeUser.email,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });

      await loginController(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        username: makeUser.username,
        email: makeUser.email,
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });
    });
    it('deve retornar 400 se ocorrer algum erro', async () => {
      vi.mocked(loginService).mockImplementation(() => {
        throw new Error('Error');
      });

      await loginController(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });
  describe('refreshTokenController', () => {
    it('deve retornar Unauthorized se o refreshToken não existir', async () => {
      await refreshTokenController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Unauthorized',
      });
    });
    it('deve retornar status 401 se um error de Unauthorized existir', async () => {
      mockRequest.cookies = { refreshToken: 'valid-refresh-token' };
      vi.mocked(refreshTokenService).mockResolvedValue({
        errors: {
          error: true,
          status: '401',
        },
        tokens: {
          accessToken: 'unknown-token',
          refreshToken: 'unknown-token',
        },
      });

      await refreshTokenController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Unauthorized',
      });
    });
    it('deve retornar 403 se um error de forbiden existir', async () => {
      mockRequest.cookies = { refreshToken: 'valid-refresh-token' };
      vi.mocked(refreshTokenService).mockResolvedValue({
        errors: {
          error: true,
          status: '403',
        },
        tokens: {
          accessToken: 'unknown-token',
          refreshToken: 'unknown-token',
        },
      });

      await refreshTokenController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Forbidden',
      });
    });
    it('deve criar um novo refreshToken e retornar o accessToken', async () => {
      mockRequest.body = { refreshToken: 'valid-refresh-token' };
      vi.mocked(refreshTokenService).mockResolvedValue({
        errors: {
          error: false,
          status: '',
        },
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });

      await refreshTokenController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        tokens: {
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
        },
      });
    });
    it('deve retornar 500 se ocorreu algum erro', async () => {
      vi.mocked(refreshTokenService).mockImplementation(() => {
        throw new Error('Error');
      });

      await refreshTokenController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });
  describe('logoutController', () => {
    it('deve retornar erro se o token não for fornecido', async () => {
      await logoutController(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Forbidden',
      });
    });
    it('deve receber um token e fazer o logout do usuário', async () => {
      mockRequest.cookies = { refreshToken: 'valid-refresh-token' };
      vi.mocked(logoutService).mockResolvedValue({
        status: '204',
        message: 'Logged out successfully',
      });

      await logoutController(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Logged out successfully',
      });
    });
  });
  describe('getUserController', () => {
    it('deve retornar undefined se o userId não for fornecido', async () => {
      mockRequest.userId = '';

      const result = await getUserController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBeUndefined();
    });
    it('deve retornar 200 se os dados do usuário forem retornado', async () => {
      mockRequest.userId = 'user-123';

      await getUserController(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
    it('deve retornar 500 se ocorrer algum erro', async () => {
      mockRequest.userId = 'user-123';

      vi.mocked(getUserService).mockImplementation(() => {
        throw new Error('Error');
      });

      await getUserController(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });
});
