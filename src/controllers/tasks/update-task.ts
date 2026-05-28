import { type Request } from "express";
import type { UpdateTaskUseCase } from "../../use-cases/tasks/update-task";

import { ok, serverError } from "../../helpers/http";

export class UpdateTaskController {
  private readonly updateTaskUseCase;

  constructor(updateTaskUseCase: UpdateTaskUseCase) {
    this.updateTaskUseCase = updateTaskUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const taskId = httpRequest.params.taskId as string;
      const updateTaskParams = httpRequest.body;

      const result = await this.updateTaskUseCase.execute(
        taskId,
        updateTaskParams,
      );

      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
