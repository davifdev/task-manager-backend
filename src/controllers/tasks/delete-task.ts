import validator from "validator";
import { type Request } from "express";
import { badRequest, ok, serverError } from "../../helpers/http";
import type { DeleteTaskUseCase } from "../../use-cases/tasks/delete-task";

export class DeleteTaskController {
  private readonly deleteTaskUseCase;

  constructor(deleteTaskUseCase: DeleteTaskUseCase) {
    this.deleteTaskUseCase = deleteTaskUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const taskId = httpRequest.params.taskId as string;

      const checkIfIsIdIsValid = validator.isUUID(taskId);

      if (!checkIfIsIdIsValid) {
        return badRequest({
          message: "taskId is invalid",
        });
      }

      const deletedTask = await this.deleteTaskUseCase.execute(taskId);

      return ok(deletedTask);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
