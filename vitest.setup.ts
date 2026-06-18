import { afterEach } from "vitest";
import { PostgresClient } from "./src/db/postgres/client";

beforeEach(async () => {
  await PostgresClient.query("DELETE FROM users");
  await PostgresClient.query("DELETE FROM tasks");
});

afterEach(async () => {
  vi.resetAllMocks();

  await PostgresClient.query("DELETE FROM users");
  await PostgresClient.query("DELETE FROM tasks");
});
