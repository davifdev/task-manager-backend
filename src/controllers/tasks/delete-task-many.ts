import { ok, serverError } from "../../helpers/http";
import type { DeleteTasksManyUseCase } from "../../use-cases/tasks/delete-task-many";

export class DeleteTasksManyController {
  private readonly deleteTasksManyUseCase;

  constructor(deleTasksManyUseCase: DeleteTasksManyUseCase) {
    this.deleteTasksManyUseCase = deleTasksManyUseCase;
  }

  async execute() {
    try {
      const result = await this.deleteTasksManyUseCase.execute();

      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
