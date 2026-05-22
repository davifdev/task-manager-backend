import { type Request } from "express";
import type { CreateUserUseCase } from "../../use-cases/users/create-user";
import type { BodyParamsCreateUser } from "../../models/users/create-user";
import validator from "validator";

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
        return {
          statusCode: 400,
          body: { message: `field ${field} is missing.` },
        };
      }
    }

    const firstNameIsValid = params.first_name.length > 3;
    if (!firstNameIsValid) {
      return {
        statusCode: 400,
        body: { message: "first name must have more than 3 characters." },
      };
    }

    const lastNameIsValid = params.last_name.length > 3;
    if (!lastNameIsValid) {
      return {
        statusCode: 400,
        body: { message: "last name must have more than 3 characters." },
      };
    }

    const emailIsValid = validator.isEmail(params.email);
    if (!emailIsValid) {
      return {
        statusCode: 400,
        body: { message: "email is invalid" },
      };
    }

    const passwordIsValid = params.password.length >= 6;
    if (!passwordIsValid) {
      return {
        statusCode: 400,
        body: { message: "password must have at least 6 characters." },
      };
    }

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
