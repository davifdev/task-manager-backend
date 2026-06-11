/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteTasksManyController } from "./delete-task-many";

describe("DeleteTaskManyController", () => {
  class DeleteTasksManyUseCaseStub {
    async execute() {}
  }
  const makeSut = () => {
    const deleteTaskManyUseCase = new DeleteTasksManyUseCaseStub();
    const sut = new DeleteTasksManyController(deleteTaskManyUseCase as any);

    return {
      sut,
      deleteTaskManyUseCase,
    };
  };

  it("should return 200 when many tasks deleted successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute();

    expect(response.statusCode).toBe(200);
  });
});
