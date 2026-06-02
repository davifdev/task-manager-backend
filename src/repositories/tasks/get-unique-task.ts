import { PostgresClient } from "../../db/postgres/client";

export class GetUniqueTaskRepository {
  async execute(taskId: string) {
    const result = await PostgresClient.query(
      "SELECT * FROM tasks WHERE id = $1",
      [taskId],
    );

    return result;
  }
}
