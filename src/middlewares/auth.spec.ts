/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './auth';

vi.mock('jsonwebtoken');

describe('authMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockNext: NextFunction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      json: vi.fn(),
    };
    process.env.SECRET_KEY = 'test-secret';
  });

  it('deve retornar 401 se o token não for fornecido', () => {
    mockRequest.headers = {};

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve inserir o userId no request e chamar next se o token for válido', () => {
    const validToken = 'valid.token.here';
    mockRequest.headers = { authorization: `Bearer ${validToken}` };
    const userId = '12345';
    const decodedPayload = { userId };

    vi.mocked(jwt.verify).mockReturnValue(decodedPayload as any);

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(jwt.verify).toHaveBeenCalledWith(validToken, process.env.SECRET_KEY);
    expect(mockRequest.userId).toBe(userId);
    expect(mockNext).toHaveBeenCalled();
  });

  it('deve retornar 401 se o token estiver expirado ou inválido', () => {
    mockRequest.headers = { authorization: `Bearer expired-token` };

    vi.mocked(jwt.verify).mockImplementation(() => {
      throw new Error('Token expired');
    });

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Token expired',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
