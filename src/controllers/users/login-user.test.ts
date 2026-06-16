/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUserParams, loginUserReturn } from "../../__tests__/user";
import { UserNotFoundError } from "../../helpers/errors";
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

  it("should call LoginUserUseCase with correct params", async () => {
    const { sut, loginUserUseCase } = makeSut();

    const loginUserSpy = vi
      .spyOn(loginUserUseCase, "execute")
      .mockResolvedValue(loginUserReturn);

    await sut.execute(httpRequest as any);

    expect(loginUserSpy).toHaveBeenCalledWith(loginUserParams);
  });

  it("should return 500 if occurrss on error", async () => {
    const { sut, loginUserUseCase } = makeSut();

    vi.spyOn(loginUserUseCase, "execute").mockImplementation(() => {
      throw new Error();
    });

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(500);
  });
});
