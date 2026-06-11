import { task } from "../../__tests__/tasks/create-task";
import { faker } from "@faker-js/faker";
import { CreateTaskController } from "./create-task";
import { type Request } from "express";

describe("CreateTaskController", () => {
  class CreateTaskUseCaseStub {
    async execute() {
      return task;
    }
  }

  const makeSut = () => {
    const createTaskUseCase = new CreateTaskUseCaseStub();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const response = await sut.execute(httpRequest as Request);

    expect(response.statusCode).toBe(201);
  });
});
