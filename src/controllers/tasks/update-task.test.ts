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

  it("should return 200 if task updated with successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(200);
  });

  it("should return 400 if taskId is not valid", async () => {
    httpRequest.params.taskId = "";
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(400);
  });
});
