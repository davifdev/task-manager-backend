import { PostgresClient } from "../../db/postgres/client";
import type { UpdateTaskParams } from "../../models/tasks/create-task.model";

type KeyType = keyof UpdateTaskParams;

export class UpdateTaskRepository {
  async execute(taskId: string, updateTaskParams: UpdateTaskParams) {
    const updateFields: string[] = [];
    const updateValues: string[] = [];

    Object.keys(updateTaskParams).forEach(key => {
      updateFields.push(`${key} = $${updateValues.length + 1}`);

      updateValues.push(updateTaskParams[key as KeyType]);
    });

    updateValues.push(taskId);

    const updateQuery = `
      UPDATE tasks
      SET ${updateFields.join(", ")}
      WHERE id = $${updateValues.length}
      RETURNING * 
    `;

    const updatedTask = await PostgresClient.query(updateQuery, updateValues);

    return updatedTask[0];
  }
}
