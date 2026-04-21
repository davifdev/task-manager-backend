import type { Request, Response, NextFunction } from 'express';
import { validateCreateTask } from './createTask.validation';

describe('createTaskValidation', () => {
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

  it('deve retornar 400 se o título da tarefa não for fornecido', () => {
    mockRequest.body = {
      description: 'Task description',
      status: 'not_started',
      time: 'morning',
    };

    validateCreateTask(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('deve retornar 400 se a descrição da tarefa não for fornecida', () => {
    mockRequest.body = {
      title: 'Task title',
      status: 'not_started',
      time: 'morning',
    };

    validateCreateTask(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('deve retornar 400 se o status da tarefa for inválido', () => {
    mockRequest.body = {
      title: 'Task title',
      description: 'Task description',
      time: 'morning',
    };

    validateCreateTask(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('deve retornar 400 se o tempo da tarefa não for fornecido', () => {
    mockRequest.body = {
      title: 'Task title',
      description: 'Task description',
      status: 'not_started',
    };

    validateCreateTask(
      mockRequest as Request,
      mockResponse as Response,
      mockNext as NextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});
