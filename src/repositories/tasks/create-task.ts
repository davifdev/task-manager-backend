import { PostgresClient } from "../../db/postgres/client";
import type { TaskType } from "../../models/tasks/create-task";
export class CreateTaskRepository {
  async execute(createTaskParams: TaskType) {
    const result = await PostgresClient.query(
      "INSERT INTO tasks (id, title, status, time, description) VALUES ($1, $2, $3, $4, $5)",
      [
        createTaskParams.id,
        createTaskParams.title,
        createTaskParams.status,
        createTaskParams.time,
        createTaskParams.description,
      ],
    );

    return result[0];
  }
}
