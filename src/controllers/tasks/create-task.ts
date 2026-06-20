import { type Request } from "express";
import type { CreateTaskUseCase } from "../../use-cases/tasks/create-task";
import type { BodyParams } from "../../models/tasks/create-task.model";
import { badRequest, create, serverError } from "../helpers/http";

type RequiredFields = keyof BodyParams;
export class CreateTaskController {
  private readonly createTaskUseCase;

  constructor(createTaskUseCase: CreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const params: BodyParams = httpRequest.body;
      const userId = httpRequest.userId as string;

      const requiredFields: RequiredFields[] = [
        "title",
        "time",
        "status",
        "description",
      ];

      for (const field of requiredFields) {
        if (!params[field]) {
          return badRequest({ message: `field ${field} is missing.` });
        }
      }

      const result = await this.createTaskUseCase.execute({
        ...params,
        user_id: userId,
      });

      return create(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
