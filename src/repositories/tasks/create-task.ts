import { PostgresClient } from "../../db/postgres/client";
import type { TaskType } from "../../models/tasks/create-task";
export class CreateTaskRepository {
  async execute(createTaskParams: TaskType) {
    const result = await PostgresClient.query(
      "INSERT INTO tasks (id, title, status, time, description, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        createTaskParams.id,
        createTaskParams.title,
        createTaskParams.status,
        createTaskParams.time,
        createTaskParams.description,
        createTaskParams.user_id,
      ],
    );

    return result[0];
  }
}
