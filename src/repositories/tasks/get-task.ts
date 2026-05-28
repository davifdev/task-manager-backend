import { PostgresClient } from "../../db/postgres/client";

export class GetTasksRepository {
  async execute() {
    const result = await PostgresClient.query("SELECT * FROM tasks");
    return result;
  }
}
