/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task } from "../../__tests__/tasks/create-task";
import { GetTasksUseCase } from "./get-task";

describe("GetTaskUseCase", () => {
  const userId = faker.string.uuid();
  class GetTasksRepository {
    async execute() {
      return [task, task];
    }
  }

  const makeSut = () => {
    const getTasksRepository = new GetTasksRepository();
    const sut = new GetTasksUseCase(getTasksRepository as any);

    return {
      sut,
      getTasksRepository,
    };
  };

  it("should returns tasks with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(userId);

    expect(response).toStrictEqual([task, task]);
  });

  it("should call GetTasksRepository with correct params", async () => {
    const { sut, getTasksRepository } = makeSut();

    const getTaskStub = vi
      .spyOn(getTasksRepository, "execute")
      .mockResolvedValue([task, task]);

    await sut.execute(userId);

    expect(getTaskStub).toHaveBeenCalledWith(userId);
  });

  it("should throw if GetTasksUseCase throws", async () => {
    const { sut, getTasksRepository } = makeSut();

    vi.spyOn(getTasksRepository, "execute").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(userId);

    expect(promise).rejects.toThrow();
  });
});
