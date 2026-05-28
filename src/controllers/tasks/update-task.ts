import { badRequest, notFound, ok, serverError } from "../../helpers/http";
import validator from "validator";
import { type Request } from "express";
import type { UpdateTaskUseCase } from "../../use-cases/tasks/update-task";
import type { UpdateTaskParams } from "../../models/tasks/create-task";
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
        return badRequest({
          message: "The provided UUID is invalid.",
        });
      }

      const allowedFields = ["title", "time", "status", "description"];

      const someFieldIsNotAllowed = Object.keys(updateTaskParams).some(
        field => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: "Some provided field is not allowed",
        });
      }

      if (updateTaskParams.title) {
        const titleIsValid = typeof updateTaskParams.title === "string";

        if (!titleIsValid) {
          return badRequest({
            message: "The title must be a string",
          });
        }
      }

      if (updateTaskParams.time) {
        const timeIsValid =
          updateTaskParams.time === "morning" ||
          updateTaskParams.time === "afternoon" ||
          updateTaskParams.time === "evening";

        if (!timeIsValid) {
          return badRequest({
            message: "The time must be a morning, afternoon or evening",
          });
        }
      }

      if (updateTaskParams.status) {
        const statusIsValid =
          updateTaskParams.status === "is_pending" ||
          updateTaskParams.status === "in_progress" ||
          updateTaskParams.status === "is_completed";

        if (!statusIsValid) {
          return badRequest({
            message:
              "The status must be a is_pending, in_progress or is_completed",
          });
        }
      }

      if (updateTaskParams.description) {
        const descriptionIsString =
          typeof updateTaskParams.description === "string";
        const descriptionIsValid = updateTaskParams.description.length > 3;
        if (!descriptionIsString) {
          return badRequest({
            message: "The description must be a string",
          });
        }

        if (!descriptionIsValid) {
          return badRequest({
            message: "The description must be at least 3 characters",
          });
        }
      }

      const result = await this.updateTaskUseCase.execute(
        taskId,
        updateTaskParams,
      );

      if (!result) {
        return notFound({
          message: "task not found",
        });
      }

      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
