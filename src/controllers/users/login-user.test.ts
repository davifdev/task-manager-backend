/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUserParams, loginUserReturn } from "../../__tests__/user";
import { LoginUserController } from "./login-user";

describe("LoginUserController", () => {
  class LoginUserUseCaseSpy {
    async execute() {
      return loginUserReturn;
    }
  }

  const httpRequest = {
    body: loginUserParams,
  };

  const makeSut = () => {
    const loginUserUseCase = new LoginUserUseCaseSpy();
    const sut = new LoginUserController(loginUserUseCase as any);

    return { sut, loginUserUseCase };
  };

  it("should return 200 if login user with successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(200);
  });

  it("should return 400 if email is invalid", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        email: "invalid_email",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if password is invalid", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        password: "123",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });
});
