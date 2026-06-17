import { task } from "../../__tests__/tasks/create-task";
import { user } from "../../__tests__/user";
import { PostgresClient } from "../../db/postgres/client";
import { CreateTaskRepository } from "./create-task";
import { DeleteTaskRepository } from "./delete-task";

describe("DeleteTaskRepository", () => {
  const makeSut = () => {
    const sut = new DeleteTaskRepository();
    const createTaskRepository = new CreateTaskRepository();

    return {
      sut,
      createTaskRepository,
    };
  };

  const createUser = async () => {
    const result = await PostgresClient.query(
      "INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user.id, user.first_name, user.last_name, user.email, user.password],
    );

    return result[0];
  };

  it("should deleted task with success", async () => {
    const user = await createUser();
    const { sut, createTaskRepository } = makeSut();

    const taskCreated = await createTaskRepository.execute({
      ...task,
      user_id: user.id,
    });

    const response = await sut.execute(taskCreated.id);

    expect(response).toStrictEqual({ ...task, user_id: user.id });
  });

  it("should throw if DeleteTaskRepository throws", async () => {
    const user = await createUser();

    const { sut, createTaskRepository } = makeSut();
    const taskCreated = await createTaskRepository.execute({
      ...task,
      user_id: user.id,
    });

    vi.spyOn(PostgresClient, "query").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(taskCreated.id);

    expect(promise).rejects.toThrow();
  });
});
