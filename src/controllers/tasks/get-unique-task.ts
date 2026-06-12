import { type Request } from "express";
import type { GetUniqueTaskUseCase } from "../../use-cases/tasks/get-unique-task";
import { checkIfIdIsValid } from "../../helpers/validation";
import { idIsInvalidResponse } from "../helpers/response-message";
import { notFound, ok, serverError } from "../helpers/http";
import { TaskNotFound } from "../../helpers/errors";
export class GetUniqueTaskController {
  private readonly getUniqueTaskUseCase;

  constructor(getUniqueTaskUseCase: GetUniqueTaskUseCase) {
    this.getUniqueTaskUseCase = getUniqueTaskUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const taskId = httpRequest.params.taskId as string;

      const taskIdIsValid = checkIfIdIsValid(taskId);

      if (!taskIdIsValid) {
        return idIsInvalidResponse();
      }

      const result = await this.getUniqueTaskUseCase.execute(taskId);

      return ok(result);
    } catch (error) {
      console.error(error);

      if (error instanceof TaskNotFound) {
        return notFound({
          message: error.message,
        });
      }

      return serverError();
    }
  }
}
