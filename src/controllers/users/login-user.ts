import { type Request } from "express";

import type { LoginUserUseCase } from "../../use-cases/users/login-user";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
} from "../../helpers/validation";
import type { LoginParams } from "../../models/users/create-user";
import { badRequest, notFound, ok, serverError } from "../../helpers/http";
import {
  EmailOrPasswordIsInvalid,
  UserNotFoundError,
} from "../../helpers/errors";

export class LoginUserController {
  private readonly loginUserUseCase;

  constructor(loginUserUseCase: LoginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const params: LoginParams = httpRequest.body;

      const emailIsValid = checkIfEmailIsValid(params.email);
      if (!emailIsValid) {
        return badRequest({
          message: "Email is invalid",
        });
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password);
      if (!passwordIsValid) {
        return badRequest({
          message: "password must have at least 6 characters",
        });
      }

      const result = await this.loginUserUseCase.execute(params);

      return ok(result);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return notFound({
          message: error.message,
        });
      }
      if (error instanceof EmailOrPasswordIsInvalid) {
        return badRequest({
          message: error.message,
        });
      }
      console.error(error);
      return serverError();
    }
  }
}
