/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task } from "../../__tests__/tasks/create-task";
import { GetUniqueTaskController } from "./get-unique-task";

describe("GetUniqueTaskController", () => {
  class GetUniqueTaskUseCase {
    async execute() {
      return task;
    }
  }

  const makeSut = () => {
    const getUniqueTaskUseCase = new GetUniqueTaskUseCase();
    const sut = new GetUniqueTaskController(getUniqueTaskUseCase as any);

    return {
      sut,
      getUniqueTaskUseCase,
    };
  };

  const httpRequest = {
    params: {
      taskId: faker.string.uuid(),
    },
  };

  it("should return 200 if task returned with successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(200);
  });

  it("should return 400 if taskId is not valid", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      taskId: "",
    } as any);

    expect(response.statusCode).toBe(200);
  });

  it("should call GetUniqueTaskUseCase with correct params", async () => {
    const { sut, getUniqueTaskUseCase } = makeSut();

    const getUniqueTaskSpy = vi
      .spyOn(getUniqueTaskUseCase, "execute")
      .mockResolvedValue(task);

    await sut.execute(httpRequest as any);

    expect(getUniqueTaskSpy).toHaveBeenCalledWith(httpRequest.params.taskId);
  });
});
