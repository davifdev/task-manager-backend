import type { Request, Response, NextFunction } from 'express';
import { validateUpdateTaskStatus } from './updateTaskStatus.validation';

describe('validateUpdateTaskStatus (unit)', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockNext: NextFunction = vi.fn();

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      json: vi.fn(),
    };
  });

  it('deve retornar 400 se o status da tarefa for inválido', () => {
    validateUpdateTaskStatus(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockNext).not.toHaveBeenCalled();
  });
});
