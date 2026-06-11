/* eslint-disable @typescript-eslint/no-explicit-any */
import { task } from "../../__tests__/tasks/create-task";
import { faker } from "@faker-js/faker";
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

  const taskCreated = {
    user_id: faker.string.uuid(),
    title: faker.lorem.words(1),
    description: faker.lorem.words(1),
    status: faker.lorem.words(1),
    time: faker.lorem.words(1),
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
});
