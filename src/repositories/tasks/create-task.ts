import { PostgresClient } from "../../db/postgres/client";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "is_pending" | "is_progress" | "is_completed";
  time: "morning" | "afternoon" | "evening";
}
export class CreateTaskRepository {
  async execute(createTaskParams: Task) {
    const result = await PostgresClient.query(
      "INSERT INTO users (id, title, description, status, time) VALUES ($1, $2, $3, $4, $5)",
      [
        createTaskParams.id,
        createTaskParams.title,
        createTaskParams.description,
        createTaskParams.status,
        createTaskParams.time,
      ],
    );

    return result[0];
  }
}
