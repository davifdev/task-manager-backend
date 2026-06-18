import { CreateUserController } from "../controllers/users/create-user";
import { LoginUserController } from "../controllers/users/login-user";
import { RefreshTokenController } from "../controllers/users/refresh-token";
import {
  createUserFactory,
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
});
