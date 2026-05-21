import { PostgresClient } from "../../db/postgres/client";
import type { UserType } from "../../models/users/create-user";
export class CreateUserRepository {
  async execute(createUserParams: UserType) {
    const result = await PostgresClient.query(
      "INSERT INTO users (id, first_name, last_name, email, password) VALUE ($1, $2, $3, $4, $5)",
      [
        createUserParams.userId,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    return result[0];
  }
}
