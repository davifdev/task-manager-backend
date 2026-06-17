/* eslint-disable @typescript-eslint/no-explicit-any */
import { throws } from "node:assert";
import { DeleteTasksManyUseCase } from "./delete-task-many";

describe("DeleteTaskManyUseCase", () => {
  class DeleteTaskManyRepositoryStub {
    async execute() {}
  }

  const makeSut = () => {
    const deleteTaskManyRepository = new DeleteTaskManyRepositoryStub();
    const sut = new DeleteTasksManyUseCase(deleteTaskManyRepository as any);

    return {
      sut,
      deleteTaskManyRepository,
    };
  };

  it("should deleted all tasks with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute();

    expect(response).toBeUndefined();
  });

  it("should throw if DeleteTaskManyRepository throws", async () => {
    const { sut, deleteTaskManyRepository } = makeSut();

    vi.spyOn(deleteTaskManyRepository, "execute").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute();

    expect(promise).rejects.toThrow();
  });
});
