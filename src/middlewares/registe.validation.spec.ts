import type { Request, Response, NextFunction } from 'express';
import { validateResgister } from './register.validation';

describe('validateRegister (unit)', () => {
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

  it('deve retornar 400 se o nome de usuário não for fornecido', () => {
    mockRequest.body = {
      email: 'email@exemplo.com',
      password: 'validPassword123',
    };

    validateResgister(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar 400 se o email não tiver o formato correto', () => {
    mockRequest.body = {
      email: 'invalid-email',
      password: 'validPassword123',
    };

    validateResgister(
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

    validateResgister(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve retornar 200 se os dados de registro forem válidos', () => {
    mockRequest.body = {
      username: 'validUser',
      email: 'email@exemplo.com',
      password: '12345678',
    };

    validateResgister(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockNext).toHaveBeenCalled();
  });
});
