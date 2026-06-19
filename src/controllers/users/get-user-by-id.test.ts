/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { user } from "../../__tests__/user";
import { GetUserByIdController } from "./get-user-by-id";
import { UserNotFoundError } from "../../helpers/errors";

describe("GetUserByIdController", () => {
  const userId = faker.string.uuid();

  class GetUserByIdUseCaseStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getUserByIdUseCase = new GetUserByIdUseCaseStub();
    const sut = new GetUserByIdController(getUserByIdUseCase as any);

    return {
      sut,
      getUserByIdUseCase,
    };
  };

  const httpRequest = {
    userId,
  };

  it("should return 200 if user is returned with successfully", async () => {
    const { sut } = makeSut();

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(200);
  });

  it("should return 400 if user id is not valid", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({ ...httpRequest, userId: "" } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should call GetUserByIdUseCase with correct params", async () => {
    const { sut, getUserByIdUseCase } = makeSut();

    const getUserByIdSpy = vi
      .spyOn(getUserByIdUseCase, "execute")
      .mockResolvedValue(user);

    await sut.execute(httpRequest as any);

    expect(getUserByIdSpy).toHaveBeenCalledWith(httpRequest.userId);
  });

  it("should return 404 if user is not found", async () => {
    const { sut, getUserByIdUseCase } = makeSut();

    vi.spyOn(getUserByIdUseCase, "execute").mockImplementation(() => {
      throw new UserNotFoundError(userId);
    });

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(404);
  });

  it("should return 500 if occurrs on error", async () => {
    const { sut, getUserByIdUseCase } = makeSut();

    vi.spyOn(getUserByIdUseCase, "execute").mockImplementation(() => {
      throw new Error();
    });

    const response = await sut.execute(httpRequest as any);

    expect(response.statusCode).toBe(500);
  });
});
