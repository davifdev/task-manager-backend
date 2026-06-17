/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task, taskUpdated } from "../../__tests__/tasks/create-task";
import { UpdateTaskUseCase } from "./update-task";

describe("UpdateTaskUseCase", () => {
  const taskId = faker.string.uuid();
  class UpdateTaskUseRepositoryStub {
    async execute() {
      return task;
    }
  }

  const makeSut = () => {
    const updateTaskRepository = new UpdateTaskUseRepositoryStub();
    const sut = new UpdateTaskUseCase(updateTaskRepository as any);

    return {
      sut,
      updateTaskRepository,
    };
  };

  it("should return a task updated with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(taskId, taskUpdated);

    expect(response).toStrictEqual(task);
  });

  it("should call UpdateTaskRepository with correct params", async () => {
    const { sut, updateTaskRepository } = makeSut();

    const updateTaskSpy = vi
      .spyOn(updateTaskRepository, "execute")
      .mockResolvedValue(task);

    await sut.execute(taskId, taskUpdated);

    expect(updateTaskSpy).toHaveBeenCalledWith(taskId, taskUpdated);
  });

  it("should throw if UpdateTaskUseCase throws", async () => {
    const { sut, updateTaskRepository } = makeSut();

    vi.spyOn(updateTaskRepository, "execute").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(taskId, taskUpdated);

    expect(promise).rejects.toThrow();
  });
});
