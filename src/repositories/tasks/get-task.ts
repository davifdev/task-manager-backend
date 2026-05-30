import { PostgresClient } from "../../db/postgres/client";
export class GetTasksRepository {
  async execute(userId: string) {
    const result = await PostgresClient.query(
      "SELECT * FROM tasks WHERE user_id = $1",
      [userId],
    );
    return result;
  }
}
