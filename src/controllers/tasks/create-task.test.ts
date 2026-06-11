/* eslint-disable @typescript-eslint/no-explicit-any */
import { task, taskCreated } from "../../__tests__/tasks/create-task";
import { CreateTaskController } from "./create-task";

describe("CreateTaskController", () => {
  class CreateTaskUseCaseStub {
    async execute() {
      return task;
    }
  }

  const makeSut = () => {
    const createTaskUseCase = new CreateTaskUseCaseStub();

    const sut = new CreateTaskController(createTaskUseCase as any);

    return {
      sut,
      createTaskUseCase,
    };
  };

  const httpRequest = {
    body: taskCreated,
  };

  it("should return 201 when task created successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(201);
  });

  it("should return 400 if title is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...httpRequest.body,
        title: "",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if time is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...httpRequest.body,
        time: "",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if status is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...httpRequest.body,
        status: "",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if description is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...httpRequest.body,
        description: "",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if user_id is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...httpRequest.body,
        user_id: "",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 500  if occurr on error", async () => {
    const { sut, createTaskUseCase } = makeSut();

    vi.spyOn(createTaskUseCase, "execute").mockImplementation(() => {
      throw new Error();
    });

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(500);
  });

  it("should call CreateTaskUseCase with correct params", async () => {
    const { sut, createTaskUseCase } = makeSut();

    const createTaskSpy = vi
      .spyOn(createTaskUseCase, "execute")
      .mockResolvedValue(task);

    await sut.execute(httpRequest as any);

    expect(createTaskSpy).toHaveBeenCalledWith(taskCreated);
  });
});
