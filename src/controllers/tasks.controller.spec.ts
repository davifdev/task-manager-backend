import { type Request, type Response } from 'express';
import {
  createTaskController,
  deleteAllTasksController,
  deleteTaskController,
  getAllTasksController,
  updateTaskController,
  updateTaskStatusController,
} from './tasks.controller';
import {
  createTaskService,
  deleteAllTasksService,
  deleteTaskService,
  getAllTasksServices,
  updateTaskService,
  updateTaskStatusService,
} from '../services/tasks.service';

vi.mock('../services/tasks.service', () => {
  return {
    getAllTasksServices: vi.fn(),
    createTaskService: vi.fn(),
    deleteTaskService: vi.fn(),
    deleteAllTasksService: vi.fn(),
    updateTaskService: vi.fn(),
    updateTaskStatusService: vi.fn(),
  };
});

describe('taskController (unit)', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const makeTask = {
    title: 'any-title',
    time: 'morning',
    status: 'in_progress',
    description: 'any-description',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockRequest = {
      userId: 'user_id',
      body: {},
      params: {
        id: 'id_params',
      },
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      json: vi.fn(),
    };
  });

  describe('getAllTaskController', () => {
    it('deve retornar undefined se o userId não for fornecido', async () => {
      mockRequest.userId = '';

      const result = await getAllTasksController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBeUndefined();
    });

    it('deve retornar status 500 se ocorrer algum erro', async () => {
      vi.mocked(getAllTasksServices).mockImplementation(() => {
        throw new Error('Error');
      });

      await getAllTasksController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });

    it('deve retornar status 200 se o userId for fornecido', async () => {
      await getAllTasksController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('createTaskController', () => {
    it('deve retornar undefined se o userId não for fornecido', async () => {
      mockRequest.userId = '';

      const result = await createTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBeUndefined();
    });
    it('deve criar uma nova tarefa se userId e os Dados forem fornecidos', async () => {
      mockRequest.body = { makeTask };

      await createTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task created successfully',
      });
    });
    it('deve retornar 500 se ocorrer algum erro', async () => {
      vi.mocked(createTaskService).mockImplementation(() => {
        throw new Error('Error');
      });

      await createTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });

  describe('deleteTaskController', () => {
    it('deve retornar undefined se não receber nenhum parâmetro', async () => {
      mockRequest.params = {};
      const result = await deleteTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBeUndefined();
    });
    it('deve receber um id e deletar uma tarefa especifica', async () => {
      await deleteTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task deleted successfully',
      });
    });
    it('deve retornar 500 se ocorrer algum erro', async () => {
      vi.mocked(deleteTaskService).mockImplementation(() => {
        throw new Error('Error');
      });

      await deleteTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });

  describe('deleteAllTasksController', () => {
    it('deve retornar undefined se o userId não for fornecido', async () => {
      mockRequest.userId = '';

      const result = await deleteAllTasksController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBeUndefined();
    });
    it('deve deletar todas as tarefas se o userId for fornecido', async () => {
      await deleteTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task deleted successfully',
      });
    });
    it('deve retornar 500 se ocorrer algum erro', async () => {
      vi.mocked(deleteAllTasksService).mockImplementation(() => {
        throw new Error('Error');
      });

      await deleteAllTasksController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });

  describe('updateTaskController', () => {
    it('deve retornar undefined se o userId não for fornecido', async () => {
      mockRequest.userId = '';

      const result = await updateTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBeUndefined();
    });
    it('deve atualizar uma tarefa existente', async () => {
      mockRequest.body = { makeTask };

      await updateTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task updated successfully',
      });
    });
    it('deve retornar 500 se ocorrer algum erro', async () => {
      vi.mocked(updateTaskService).mockImplementation(() => {
        throw new Error('Error');
      });

      await updateTaskController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });

  describe('updateTaskStatusController', () => {
    it('deve retornar undefined se taskId e status não forem fornecidos', async () => {
      mockRequest.params = {};
      mockRequest.body = { status: '' };

      const result = await updateTaskStatusController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(result).toBeUndefined();
    });
    it('deve atualizar o status de uma tarefa', async () => {
      mockRequest.body = { status: 'completed' };

      await updateTaskStatusController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task status updated successfully',
      });
    });
    it('deve retornar 500 se ocorrer algum erro', async () => {
      mockRequest.body = { status: 'completed' };

      vi.mocked(updateTaskStatusService).mockImplementation(() => {
        throw new Error('Error');
      });

      await updateTaskStatusController(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error',
      });
    });
  });
});
