/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task } from "../../__tests__/tasks/create-task";
import { GetTasksController } from "./get-task";

describe("GetTasksController", () => {
  class GetTasksUseCaseStub {
    async execute() {
      return [task];
    }
  }

  const makeSut = () => {
    const getTasksUseCase = new GetTasksUseCaseStub();
    const sut = new GetTasksController(getTasksUseCase as any);

    return {
      sut,
      getTasksUseCase,
    };
  };

  const httpRequest = {
    userId: faker.string.uuid(),
  };

  it("should return 200 if tasks returned with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([task]);
  });
});
