import { type Request } from "express";
import type { CreateTaskUseCase } from "../../use-cases/tasks/create-task";
import type { BodyParams } from "../../models/tasks/create-task";
import validator from "validator";
import { badRequest } from "../../helpers/http";

type RequiredFields = keyof BodyParams;
export class CreateTaskController {
  private readonly createTaskUseCase;

  constructor(createTaskUseCase: CreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const params: BodyParams = httpRequest.body;
      const userId = params.user_id;
      const checkIfIsValidId = validator.isUUID(userId);

      if (!checkIfIsValidId) {
        return badRequest({ message: "the provided UUID is invalid." });
      }

      const requiredFields: RequiredFields[] = [
        "title",
        "time",
        "status",
        "description",
        "user_id",
      ];

      for (const field of requiredFields) {
        if (!params[field]) {
          return badRequest({ message: `field ${field} is missing.` });
        }
      }

      const result = await this.createTaskUseCase.execute(params);

      return {
        statusCode: 201,
        body: result,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: { message: "Internal Server Error" },
      };
    }
  }
}
