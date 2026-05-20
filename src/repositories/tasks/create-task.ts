import { PostgresClient } from "../../db/postgres/client";
import type { Task } from "../../use-cases/tasks/create-task";
export class CreateTaskRepository {
  async execute(createTaskParams: Task) {
    const result = await PostgresClient.query(
      "INSERT INTO users (id, title, description, status, time) VALUES ($1, $2, $3, $4, $5)",
      [
        createTaskParams.id,
        createTaskParams.title,
        createTaskParams.description,
        createTaskParams.status,
        createTaskParams.time,
      ],
    );

    return result[0];
  }
}
