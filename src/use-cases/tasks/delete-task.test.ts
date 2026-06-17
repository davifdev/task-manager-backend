/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task } from "../../__tests__/tasks/create-task";
import { DeleteTaskUseCase } from "./delete-task";

describe("DeleteTaskUseCase", () => {
  const taskId = faker.string.uuid();
  class DeleteTaskRepository {
    async execute() {
      return task;
    }
  }

  const makeSut = () => {
    const deleteTaskRepository = new DeleteTaskRepository();
    const sut = new DeleteTaskUseCase(deleteTaskRepository as any);

    return {
      sut,
      deleteTaskRepository,
    };
  };

  it("should deleted an task with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(taskId);

    expect(response).toStrictEqual(task);
  });

  it("should call DeleteTaskRepository with correct params", async () => {
    const { sut, deleteTaskRepository } = makeSut();

    const deleteTaskSpy = vi
      .spyOn(deleteTaskRepository, "execute")
      .mockResolvedValue(task);

    await sut.execute(taskId);

    expect(deleteTaskSpy).toHaveBeenCalledWith(taskId);
  });

  it("should throw if DeleteTaskUseCase throws", async () => {
    const { sut, deleteTaskRepository } = makeSut();

    vi.spyOn(deleteTaskRepository, "execute").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(taskId);

    expect(promise).rejects.toThrow();
  });
});
