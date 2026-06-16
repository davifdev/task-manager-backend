/* eslint-disable @typescript-eslint/no-explicit-any */
import { user, userParams } from "../../__tests__/user";
import { CreateUserController } from "./create-user";

describe("CreateUserController", () => {
  class CreateUserUseCaseSpy {
    async execute() {
      return user;
    }
  }

  class PasswordHasherAdapterStub {
    async execute() {
      return "password_hasher";
    }
  }

  const httpRequest = {
    body: userParams,
  };

  const makeSut = () => {
    const passwordHasherAdapter = new PasswordHasherAdapterStub();
    const createUserUseCase = new CreateUserUseCaseSpy();
    const sut = new CreateUserController(
      createUserUseCase as any,
      passwordHasherAdapter as any,
    );

    return {
      sut,
      createUserUseCase,
      passwordHasherAdapter,
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

  it("should return 400 if field password is not provided", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        password: undefined,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if first_name is invalid format", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        first_name: "as",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if last_name is invalid format", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        last_name: "as",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if email is invalid format", async () => {
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

  it("should return 400 if password is invalid format", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...httpRequest,
      body: {
        ...httpRequest.body,
        password: "12345",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should call CreateUserUseCase with correctly params", async () => {
    const { sut, createUserUseCase } = makeSut();

    const createUseSpy = vi
      .spyOn(createUserUseCase, "execute")
      .mockResolvedValue(user);

    await sut.execute(httpRequest as any);

    expect(createUseSpy).toHaveBeenCalledWith({
      ...userParams,
      password: "password_hasher",
    });
  });
});
