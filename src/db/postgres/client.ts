/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT)
    : undefined,
  database: process.env.POSTGRES_DB,
});

export const PostgresClient = {
  query: async (query: string, params?: any[]) => {
    const client = await pool.connect();

    const result = await client.query(query, params);

    client.release();

    return result.rows;
  },
};
