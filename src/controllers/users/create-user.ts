import { type Request } from "express";
import type { CreateUserUseCase } from "../../use-cases/users/create-user";
import type {
  BodyParamsCreateUser,
  UserType,
} from "../../models/users/create-user";
import validator from "validator";
import bcrypt from "bcrypt";
import { badRequest, ok, serverError } from "../../helpers/http";

type RequiredFields = keyof BodyParamsCreateUser;
export class CreateUserController {
  private readonly createUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest: Request) {
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

    const firstNameIsValid = params.first_name.length > 3;
    if (!firstNameIsValid) {
      return badRequest({
        message: "first_name must have more than 3 characters.",
      });
    }

    const lastNameIsValid = params.last_name.length > 3;
    if (!lastNameIsValid) {
      return badRequest({
        message: "last_name must have more than 3 characters.",
      });
    }

    const emailIsValid = validator.isEmail(params.email);
    if (!emailIsValid) {
      return badRequest({ message: "email is invalid" });
    }

    const passwordIsValid = params.password.length >= 6;
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

    try {
      const result = await this.createUserUseCase.execute(createdUser);

      return ok<UserType>(result);
    } catch (error) {
      console.error(error);
      return serverError({
        message: "Internal Server Error",
      });
    }
  }
}
