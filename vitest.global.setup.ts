import { pool, PostgresClient } from "./src/db/postgres/client";
import { execSync } from "child_process";

export async function setup() {
  execSync("docker compose up -d --wait postgres-test");
}

export async function teardown() {
  // Roda depois de todos os testes,

  await PostgresClient.query("DELETE FROM users");
  await PostgresClient.query("DELETE FROM tasks");

  await pool.end();
}
