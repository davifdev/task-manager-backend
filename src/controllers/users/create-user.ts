import { type Request } from "express";
import type { CreateUserUseCase } from "../../use-cases/users/create-user";
import type { BodyParamsCreateUser } from "../../models/users/create-user.model";
import bcrypt from "bcrypt";
import { badRequest, create, serverError } from "../helpers/http";
import {
  checkIfEmailIsValid,
  checkIfParameterSizeIsValid,
  checkIfPasswordIsValid,
} from "../../helpers/validation";

type RequiredFields = keyof BodyParamsCreateUser;
export class CreateUserController {
  private readonly createUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const params: BodyParamsCreateUser = httpRequest.body;

      const requiredFields: RequiredFields[] = [
        "first_name",
        "last_name",
        "email",
        "password",
      ];

      for (const field of requiredFields) {
        if (!params[field]) {
          return badRequest({ message: `field ${field} is missing.` });
        }
      }

      const firstNameIsValid = checkIfParameterSizeIsValid(params.first_name);
      if (!firstNameIsValid) {
        return badRequest({
          message: "first_name must have more than 3 characters.",
        });
      }

      const lastNameIsValid = checkIfParameterSizeIsValid(params.last_name);
      if (!lastNameIsValid) {
        return badRequest({
          message: "last_name must have more than 3 characters.",
        });
      }

      const emailIsValid = checkIfEmailIsValid(params.email);
      if (!emailIsValid) {
        return badRequest({ message: "email is invalid" });
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password);
      if (!passwordIsValid) {
        return badRequest({
          message: "password must have at least 6 characters.",
        });
      }

      const hashedPassword = await bcrypt.hash(params.password, 10);

      const createdUser = {
        ...params,
        password: hashedPassword,
      };

      const result = await this.createUserUseCase.execute(createdUser);

      return create(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
