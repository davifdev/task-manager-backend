import { type Request } from "express";
import type { CreateTaskUseCase } from "../../use-cases/tasks/create-task";
import type { BodyParams } from "../../models/tasks/create-task";

export class CreateTaskController {
  private readonly createTaskUseCase;

  constructor(createTaskUseCase: CreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase;
  }

  async execute(httpRequest: Request) {
    console.log(httpRequest.body);
    try {
      const params: BodyParams = httpRequest.body;

      const result = await this.createTaskUseCase.execute(params);

      return {
        statusCode: 201,
        body: result,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}
