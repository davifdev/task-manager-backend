/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { task, taskExample } from "../../__tests__/tasks/create-task";
import { CreateTaskUseCase } from "./create-task";

describe("CreateTaskUseCase", () => {
  const generatedId = faker.string.uuid();
  class CreateTaskRepositoryStub {
    async execute() {
      return task;
    }
  }

  class GenerateIdAdapterStub {
    execute() {
      return generatedId;
    }
  }

  const makeSut = () => {
    const createTaskRepository = new CreateTaskRepositoryStub();
    const generateIdAdapter = new GenerateIdAdapterStub();
    const sut = new CreateTaskUseCase(
      createTaskRepository as any,
      generateIdAdapter as any,
    );

    return {
      sut,
      createTaskRepository,
      generateIdAdapter,
    };
  };

  it("should return a task if CreateTaskUseCase executed with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(taskExample);

    expect(response).toStrictEqual(task);
  });

  it("should call CreateTaskRepository with correct params", async () => {
    const { sut, createTaskRepository } = makeSut();

    const createTaskSpy = vi
      .spyOn(createTaskRepository, "execute")
      .mockResolvedValue(task);

    await sut.execute(taskExample);

    expect(createTaskSpy).toHaveBeenCalledWith({
      ...taskExample,
      id: generatedId,
    });
  });

  it("should throw if CreateTaskUseCase throws", async () => {
    const { sut, createTaskRepository } = makeSut();

    vi.spyOn(createTaskRepository, "execute").mockImplementation(() => {
      throw Error();
    });

    const promise = sut.execute(taskExample);

    expect(promise).rejects.toThrow();
  });
});
