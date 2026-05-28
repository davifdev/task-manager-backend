import { ok, serverError } from "../../helpers/http";

import type { GetTasksUseCase } from "../../use-cases/tasks/get-task";

export class GetTasksController {
  private readonly getTasksUseCase;

  constructor(getTaskUseCase: GetTasksUseCase) {
    this.getTasksUseCase = getTaskUseCase;
  }

  async execute() {
    // Valida se um uuid é válido

    // Pega o usuário através do uuid se o usuário não existir retornar error
    try {
      const result = await this.getTasksUseCase.execute();

      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
