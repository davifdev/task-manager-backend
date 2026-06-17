import { task } from "../../__tests__/tasks/create-task";
import { user } from "../../__tests__/user";
import { PostgresClient } from "../../db/postgres/client";
import { CreateTaskRepository } from "./create-task";

describe("CreateTaskRepository", () => {
  const makeSut = () => {
    const sut = new CreateTaskRepository();
    return {
      sut,
    };
  };

  const createUser = async () => {
    const result = await PostgresClient.query(
      "INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user.id, user.first_name, user.last_name, user.email, user.password],
    );

    return result[0];
  };

  it("should create a task on db with success", async () => {
    const user = await createUser();
    const { sut } = makeSut();

    const response = await sut.execute({ ...task, user_id: user.id });

    expect(response).toStrictEqual({ ...task, user_id: user.id });
  });

  it("should trow if CreateUserRepository throws", async () => {
    const user = await createUser();
    const { sut } = makeSut();

    vi.spyOn(PostgresClient, "query").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute({ ...task, user_id: user.id });

    expect(promise).rejects.toThrow();
  });
});
