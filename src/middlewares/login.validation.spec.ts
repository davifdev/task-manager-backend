import type { Request, Response, NextFunction } from 'express';
import { validateLogin } from './login.validation';

describe('validateLogin (unit)', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockNext: NextFunction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      json: vi.fn(),
    };
  });

  it('deve retornar 400 se o email não tiver o formato correto', () => {
    mockRequest.body = {
      email: 'invalid-email',
      password: 'validPassword123',
    };

    validateLogin(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar 400 se a senha não tiver no mínimo 6 caracteres', () => {
    mockRequest.body = {
      email: 'email@exemplo.com',
      password: '123',
    };

    validateLogin(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar 200 se o email e a senha forem válidos', () => {
    mockRequest.body = {
      email: 'email@exemplo.com',
      password: '12345678',
    };

    validateLogin(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockNext).toHaveBeenCalled();
  });
});
