import { user } from "../../__tests__/user";
import { PostgresClient } from "../../db/postgres/client";
import { CreateUserRepository } from "./create-user";

describe("CreateUserRepository", () => {
  const makeSut = () => {
    const sut = new CreateUserRepository();

    return { sut };
  };

  it("should created user with success", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(user);

    expect(response).toStrictEqual(user);
  });

  it("should throw if CreateUserRepository throws", async () => {
    const { sut } = makeSut();

    vi.spyOn(PostgresClient, "query").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(user);

    expect(promise).rejects.toThrow();
  });
});
