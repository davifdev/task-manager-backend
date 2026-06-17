/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task } from "../../__tests__/tasks/create-task";
import { GetUniqueTaskUseCase } from "./get-unique-task";
import { TaskNotFound } from "../../helpers/errors";

describe("GetUniqueTaskUseCase", () => {
  const taskId = faker.string.uuid();
  class GetUniqueTaskUseRepositoryStub {
    async execute() {
      return task;
    }
  }

  const makeSut = () => {
    const getUniqueTaskUseRepository = new GetUniqueTaskUseRepositoryStub();
    const sut = new GetUniqueTaskUseCase(getUniqueTaskUseRepository as any);

    return {
      sut,
      getUniqueTaskUseRepository,
    };
  };

  it("should return a unique task with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(taskId);

    expect(response).toStrictEqual(task);
  });

  it("should call GetUniqueTaskRepository with correct params", async () => {
    const { sut, getUniqueTaskUseRepository } = makeSut();

    const getUniqueSpy = vi
      .spyOn(getUniqueTaskUseRepository, "execute")
      .mockResolvedValue(task);

    await sut.execute(taskId);

    expect(getUniqueSpy).toHaveBeenCalledWith(taskId);
  });

  it("should throw TaskNotFound if task not found", async () => {
    const { sut, getUniqueTaskUseRepository } = makeSut();

    vi.spyOn(getUniqueTaskUseRepository, "execute").mockImplementation(() => {
      throw new TaskNotFound();
    });

    const promise = sut.execute(taskId);

    expect(promise).rejects.toThrow(new TaskNotFound());
  });

  it("should throw GetUniqueTaskUseCase throws ", async () => {
    const { sut, getUniqueTaskUseRepository } = makeSut();

    vi.spyOn(getUniqueTaskUseRepository, "execute").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(taskId);

    expect(promise).rejects.toThrow();
  });
});
