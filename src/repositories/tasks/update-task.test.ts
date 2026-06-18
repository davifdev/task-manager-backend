import { task, taskUpdated } from "../../__tests__/tasks/create-task";
import { user } from "../../__tests__/user";
import { PostgresClient } from "../../db/postgres/client";
import { CreateTaskRepository } from "./create-task";
import { UpdateTaskRepository } from "./update-task";

describe("UpdateTaskRepository", () => {
  const makeSut = () => {
    const sut = new UpdateTaskRepository();
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

  it("should updated task with success", async () => {
    const user = await createUser();
    const { sut, createTaskRepository } = makeSut();
    const taskCreated = await createTaskRepository.execute({
      ...task,
      user_id: user.id,
    });

    const response = await sut.execute(taskCreated.id, {
      ...taskUpdated,
      time: "morning",
    });

    expect(response).toStrictEqual({
      ...taskUpdated,
      time: "morning",
      id: taskCreated.id,
      user_id: user.id,
    });
  });

  it("should throw if UpdateTaskRepository throws", async () => {
    const user = await createUser();

    const { sut, createTaskRepository } = makeSut();
    const taskCreated = await createTaskRepository.execute({
      ...task,
      user_id: user.id,
    });

    vi.spyOn(PostgresClient, "query").mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.execute(taskCreated.id, taskUpdated);

    expect(promise).rejects.toThrow();
  });
});
