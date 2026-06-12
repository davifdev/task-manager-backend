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

  it("should return 400 if userId is not valid", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      userId: "",
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 500 if occurr on error", async () => {
    const { sut, getTasksUseCase } = makeSut();

    vi.spyOn(getTasksUseCase, "execute").mockImplementation(() => {
      throw new Error();
    });

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(500);
  });
});
