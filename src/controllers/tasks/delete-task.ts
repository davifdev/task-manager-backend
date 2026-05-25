import validator from "validator";
import { type Request } from "express";
import { badRequest, ok, serverError } from "../../helpers/http";

export class DeleteTaskController {
  private readonly deleteTaskUseCase;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(deleteTaskUseCase: any) {
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
