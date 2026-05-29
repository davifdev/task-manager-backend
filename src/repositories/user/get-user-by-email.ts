import { PostgresClient } from "../../db/postgres/client";

export class GetUserByEmailRepository {
  async execute(email: string) {
    const result = await PostgresClient.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    return result[0];
  }
}
