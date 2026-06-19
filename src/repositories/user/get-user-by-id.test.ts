import { user } from "../../__tests__/user";
import { PostgresClient } from "../../db/postgres/client";
import { GetUserByIdRepository } from "./get-user-by-id";

describe("GetUserByIdRepository", () => {
  const makeSut = () => {
    const sut = new GetUserByIdRepository();

    return { sut };
  };

  const createUser = async () => {
    const result = await PostgresClient.query(
      "INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user.id, user.first_name, user.last_name, user.email, user.password],
    );

    return result[0];
  };

  it("should return when user by id", async () => {
    const user = await createUser();
    const { sut } = makeSut();

    const response = await sut.execute(user.id);

    expect(response).toStrictEqual(user);
  });

  it("should throw if GetUserByIdRepository throws", async () => {
    const user = await createUser();
    const { sut } = makeSut();

    vi.spyOn(PostgresClient, "query").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(user.id);

    expect(promise).rejects.toThrow();
  });
});
