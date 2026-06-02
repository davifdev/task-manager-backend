import validator from "validator";
import { type Request } from "express";
import { notFound, ok, serverError } from "../helpers/http";
import type { DeleteTaskUseCase } from "../../use-cases/tasks/delete-task";
import { idIsInvalidResponse } from "../helpers/response-message";
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
        return idIsInvalidResponse();
      }

      const deletedTask = await this.deleteTaskUseCase.execute(taskId);

      if (!deletedTask) {
        return notFound({
          message: "task not found",
        });
      }

      return ok(deletedTask);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
