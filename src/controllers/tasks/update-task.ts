import { ok, serverError } from "../helpers/http";
import validator from "validator";
import { type Request } from "express";
import type { UpdateTaskUseCase } from "../../use-cases/tasks/update-task";
import type { UpdateTaskParams } from "../../models/tasks/create-task.model";
import {
  checkIfDescriptionIsValid,
  checkIfIsString,
  checkIfStatusIsValid,
  checkIfTimeIsValid,
} from "../../helpers/validation";
import {
  descriptionIsInvalidResponse,
  descriptionIsNotString,
  idIsInvalidResponse,
  someFieldIsNotAllowedResponse,
  statusIsInvalidResponse,
  taskNotFoundResponse,
  timeIsInvalidResponse,
  titleIsInvalidResponse,
} from "../helpers/response-message";
export class UpdateTaskController {
  private readonly updateTaskUseCase;

  constructor(updateTaskUseCase: UpdateTaskUseCase) {
    this.updateTaskUseCase = updateTaskUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const taskId = httpRequest.params.taskId as string;
      const updateTaskParams: UpdateTaskParams = httpRequest.body;

      const checkIfIsValidId = validator.isUUID(taskId);
      if (!checkIfIsValidId) {
        return idIsInvalidResponse();
      }

      const allowedFields = ["title", "time", "status", "description"];

      const someFieldIsNotAllowed = Object.keys(updateTaskParams).some(
        field => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return someFieldIsNotAllowedResponse();
      }

      if (updateTaskParams.title) {
        const titleIsValid = checkIfIsString(updateTaskParams.title);

        if (!titleIsValid) {
          return titleIsInvalidResponse();
        }
      }

      if (updateTaskParams.time) {
        const timeIsValid = checkIfTimeIsValid(updateTaskParams.time);

        if (!timeIsValid) {
          return timeIsInvalidResponse();
        }
      }

      if (updateTaskParams.status) {
        const statusIsValid = checkIfStatusIsValid(updateTaskParams.status);

        if (!statusIsValid) {
          return statusIsInvalidResponse();
        }
      }

      if (updateTaskParams.description) {
        const descriptionIsString = checkIfIsString(
          updateTaskParams.description,
        );
        const descriptionIsValid = checkIfDescriptionIsValid(
          updateTaskParams.description,
        );

        if (!descriptionIsString) {
          return descriptionIsNotString();
        }

        if (!descriptionIsValid) {
          return descriptionIsInvalidResponse();
        }
      }

      const result = await this.updateTaskUseCase.execute(
        taskId,
        updateTaskParams,
      );

      if (!result) {
        return taskNotFoundResponse();
      }

      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
