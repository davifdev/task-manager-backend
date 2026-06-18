import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
});

console.log("minha porta", process.env.POSTGRES_PORT);

export const PostgresClient = {
  query: async <T>(query: string, params?: T[]) => {
    const client = await pool.connect();

    const result = await client.query(query, params);

    client.release();

    return result.rows;
  },
};
