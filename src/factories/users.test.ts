import { CreateUserController } from "../controllers/users/create-user";
import { GetUserByIdController } from "../controllers/users/get-user-by-id";
import { LoginUserController } from "../controllers/users/login-user";
import { RefreshTokenController } from "../controllers/users/refresh-token";
import {
  createUserFactory,
  getUserByIdFactory,
  loginUserFactory,
  refreshTokenFactory,
} from "./users";

describe("UsersControllersFactories", () => {
  it("should return a valid CreateUserController instance", () => {
    expect(createUserFactory()).toBeInstanceOf(CreateUserController);
  });

  it("should return a valid LoginUserController instance", () => {
    expect(loginUserFactory()).toBeInstanceOf(LoginUserController);
  });

  it("should return a valid RefreshTokenController instance", () => {
    expect(refreshTokenFactory()).toBeInstanceOf(RefreshTokenController);
  });

  it("should return a valid GetUserByIdController instance", () => {
    expect(getUserByIdFactory()).toBeInstanceOf(GetUserByIdController);
  });
});
