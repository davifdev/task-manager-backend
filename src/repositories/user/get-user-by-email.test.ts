import { user } from "../../__tests__/user";
import { PostgresClient } from "../../db/postgres/client";
import { GetUserByEmailRepository } from "./get-user-by-email";

describe("GetUserByEmailRepository", () => {
  const makeSut = () => {
    const sut = new GetUserByEmailRepository();

    return { sut };
  };

  const createUser = async () => {
    const result = await PostgresClient.query(
      "INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user.id, user.first_name, user.last_name, user.email, user.password],
    );

    return result[0];
  };

  it("should return user by email received", async () => {
    const user = await createUser();
    const { sut } = makeSut();

    const response = await sut.execute(user.email);

    expect(response).toStrictEqual(user);
  });

  it("should throw if GetUserByEmailRepository throws", async () => {
    const user = await createUser();
    const { sut } = makeSut();

    vi.spyOn(PostgresClient, "query").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(user.email);

    expect(promise).rejects.toThrow();
  });
});
