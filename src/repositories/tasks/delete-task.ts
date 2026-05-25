import { PostgresClient } from "../../db/postgres/client";

export class DeleteTaskRepository {
  async execute(taskId: string) {
    const result = await PostgresClient.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [taskId],
    );

    return result[0];
  }
}
