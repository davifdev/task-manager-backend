import { ok, serverError } from "../../helpers/http";

import type { GetTasksUseCase } from "../../use-cases/tasks/get-task";

export class GetTasksController {
  private readonly getTasksUseCase;

  constructor(getTaskUseCase: GetTasksUseCase) {
    this.getTasksUseCase = getTaskUseCase;
  }

  async execute() {
    try {
      const result = await this.getTasksUseCase.execute();

      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
