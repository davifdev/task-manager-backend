import { PostgresClient } from "../../db/postgres/client";

type TaskType = {
  id: string;
  title: string;
  status: string;
  time: string;
  description: string;
};
export class CreateTaskRepository {
  async execute(createTaskParams: TaskType) {
    const result = await PostgresClient.query(
      "INSERT INTO tasks (id, title, status, time, description) VALUES ($1, $2, $3, $4, $5)",
      [
        createTaskParams.id,
        createTaskParams.title,
        createTaskParams.status,
        createTaskParams.time,
        createTaskParams.description,
      ],
    );

    return result[0];
  }
}
