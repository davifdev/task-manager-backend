import { PostgresClient } from "../../db/postgres/client";
export class DeleteTasksManyRepository {
  async execute() {
    const result = await PostgresClient.query("DELETE FROM tasks");
    return result;
  }
}
