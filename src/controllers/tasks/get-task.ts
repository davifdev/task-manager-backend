import { type Request } from "express";
import { badRequest, ok, serverError } from "../helpers/http";
import type { GetTasksUseCase } from "../../use-cases/tasks/get-task";
import { checkIfIdIsValid } from "../../helpers/validation";
import { idIsInvalidResponse } from "../helpers/response-message";
import { TaskNotFound } from "../../helpers/errors";
export class GetTasksController {
  private readonly getTasksUseCase;

  constructor(getTaskUseCase: GetTasksUseCase) {
    this.getTasksUseCase = getTaskUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const userId = httpRequest.userId as string;

      const userIdIsValid = checkIfIdIsValid(userId);
      if (!userIdIsValid) {
        return idIsInvalidResponse();
      }
      const result = await this.getTasksUseCase.execute(userId);

      return ok(result);
    } catch (error) {
      console.error(error);
      if (error instanceof TaskNotFound) {
        return badRequest({
          message: error.message,
        });
      }
      return serverError();
    }
  }
}
