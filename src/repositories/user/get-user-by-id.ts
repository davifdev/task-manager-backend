import { PostgresClient } from "../../db/postgres/client";

export class GetUserByIdRepository {
  async execute(userId: string) {
    const result = await PostgresClient.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
    );

    return result[0];
  }
}
