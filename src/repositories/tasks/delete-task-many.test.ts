import { PostgresClient } from "../../db/postgres/client";
import { DeleteTasksManyRepository } from "./delete-task-many";

describe("DeleteTaskManyRepository", () => {
  const makeSut = () => {
    const sut = new DeleteTasksManyRepository();
    return {
      sut,
    };
  };

  it("should delete all tasks", async () => {
    const { sut } = makeSut();

    const response = await sut.execute();

    expect(response).toStrictEqual([]);
  });

  it("should throw if DeleteTasksManyRepository throws", async () => {
    const { sut } = makeSut();

    vi.spyOn(PostgresClient, "query").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute();

    expect(promise).rejects.toThrow();
  });
});
