import { type Request } from "express";
import type { GetUserByIdUseCase } from "../../use-cases/users/get-user-by-id";
import { notFound, ok, serverError } from "../helpers/http";
import { UserNotFoundError } from "../../helpers/errors";
import { checkIfIdIsValid } from "../../helpers/validation";
import { idIsInvalidResponse } from "../helpers/response-message";

export class GetUserByIdController {
  private readonly getUserByIdUseCase;

  constructor(getUserByIdUseCase: GetUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const userId = httpRequest.userId as string;
      const checkIdIsValid = checkIfIdIsValid(userId);

      if (!checkIdIsValid) {
        return idIsInvalidResponse();
      }

      const result = await this.getUserByIdUseCase.execute(userId);

      return ok(result);
    } catch (error) {
      console.error(error);
      if (error instanceof UserNotFoundError) {
        return notFound({
          message: error.message,
        });
      }
      return serverError();
    }
  }
}
