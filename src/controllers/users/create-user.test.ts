/* eslint-disable @typescript-eslint/no-explicit-any */
import { user, userParams } from "../../__tests__/user";
import { CreateUserController } from "./create-user";

describe("CreateUserController", () => {
  class CreateUserUseCaseSpy {
    async execute() {
      return user;
    }
  }

  const httpRequest = {
    body: userParams,
  };

  const makeSut = () => {
    const createUserUseCase = new CreateUserUseCaseSpy();
    const sut = new CreateUserController(createUserUseCase as any);

    return {
      sut,
      createUserUseCase,
    };
  };

  it("should return 201 if user created successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(201);
  });

  it("should return 400 if field first_name is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        first_name: undefined,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if field last_name is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        last_name: undefined,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if field email is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        email: undefined,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });
});
