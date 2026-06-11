// Executado uma única vez antes (setup) e depois (tearDown) da suíte
// inteira de testes

import { PostgresClient } from "./src/db/postgres/client";

export async function setup() {
  // Roda antes de todos os testes
  // Isso é meio demais, mas às vezes o teste não roda por completo
  // e deixa lixo, como bases de dados antigas ou dados na tabela
  await PostgresClient.query("DELETE FROM users");
  await PostgresClient.query("DELETE FROM tasks");
}

export async function teardown() {
  // Roda depois de todos os testes,
  await PostgresClient.query("DELETE FROM users");
  await PostgresClient.query("DELETE FROM tasks");
}
