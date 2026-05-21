import { type Request } from "express";
import type { CreateUserUseCase } from "../../use-cases/users/create-user";

export class CreateUserController {
  private readonly createUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest: Request) {
    const params = httpRequest.body;

    try {
      const result = await this.createUserUseCase.execute(params);

      return {
        statusCode: 200,
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
