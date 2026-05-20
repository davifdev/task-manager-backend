import { type Request } from "express";
import { CreateTaskUseCase } from "../../use-cases/tasks/create-task";

export class CreateTaskController {
  async execute(httpRequest: Request) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["title", "description", "status", "time"];

      for (const field of requiredFields) {
        const fieldIsMissing = !params[field];

        if (fieldIsMissing) {
          return {
            missingField: field,
            ok: false,
          };
        }
      }

      const createTaskUseCase = new CreateTaskUseCase();

      const result = await createTaskUseCase.execute(params);

      return {
        body: result,
        statusCode: 200,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
