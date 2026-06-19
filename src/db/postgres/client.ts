import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const PostgresClient = {
  query: async <T>(query: string, params?: T[]) => {
    const client = await pool.connect();

    try {
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  },
};
