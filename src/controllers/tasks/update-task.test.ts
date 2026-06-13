/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { taskUpdated } from "../../__tests__/tasks/create-task";
import { UpdateTaskController } from "./update-task";

describe("UpdateTaskController", async () => {
  class UpdateTaskUseCaseStub {
    async execute() {
      return taskUpdated;
    }
  }

  const makeSut = () => {
    const updateTaskUseCase = new UpdateTaskUseCaseStub();
    const sut = new UpdateTaskController(updateTaskUseCase as any);

    return {
      sut,
      updateTaskUseCase,
    };
  };

  const httpRequest = {
    params: {
      taskId: faker.string.uuid(),
    },
    body: taskUpdated,
  };

  it("should return 200 if task updated successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(200);
  });

  it("should return 400 if taskId is not valid", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      params: {
        taskId: "",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if field is not allowed", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        anyField: "",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if title is not string", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        title: 123,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if times is not (morning, afternoon, evening)", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        time: "any_time",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if status is not (is_pending, in_progress, is_completed)", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        status: "any_time",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if description is not string", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        description: 123,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if description is not valid", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        description: "12",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should call UpdateTaskUseCase with correct params", async () => {
    const { sut, updateTaskUseCase } = makeSut();

    const updateTaskSpy = vi
      .spyOn(updateTaskUseCase, "execute")
      .mockResolvedValue(taskUpdated);

    await sut.execute(httpRequest as any);

    expect(updateTaskSpy).toHaveBeenCalledWith(
      httpRequest.params.taskId,
      httpRequest.body,
    );
  });

  it("should return 404 if task not found", async () => {
    const { sut, updateTaskUseCase } = makeSut();

    vi.spyOn(updateTaskUseCase, "execute").mockResolvedValue(null as any);

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(404);
  });

  it("should return 500 if occurrs on error", async () => {
    const { sut, updateTaskUseCase } = makeSut();

    vi.spyOn(updateTaskUseCase, "execute").mockImplementation(() => {
      throw new Error();
    });

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(500);
  });
});
