/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task } from "../../__tests__/tasks/create-task";
import { DeleteTaskController } from "./delete-task";

describe("DeleteTaskController", () => {
  class DeleteTaskUseCaseStub {
    async execute() {
      return task;
    }
  }
  const makeSut = () => {
    const deleteTaskUseCase = new DeleteTaskUseCaseStub();
    const sut = new DeleteTaskController(deleteTaskUseCase as any);

    return {
      sut,
      deleteTaskUseCase,
    };
  };

  const httpRequest = {
    params: {
      taskId: faker.string.uuid(),
    },
  };

  it("should return 200 if task deleted with successfully", async () => {
    const { sut } = makeSut();

    const result = await sut.execute(httpRequest as any);

    expect(result.statusCode).toBe(200);
  });
});
