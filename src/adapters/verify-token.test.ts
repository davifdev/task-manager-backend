import { VerifyTokenAdapter } from "./verify-token";
import jwt from "jsonwebtoken";

describe("VerifyTokenAdapter", () => {
  process.env.SECRET_REFRESH_KEY = "secret-test";
  const makeSut = () => {
    const sut = new VerifyTokenAdapter();
    return {
      sut,
    };
  };

  it("should return userId when token is valid", async () => {
    const { sut } = makeSut();

    const token = jwt.sign(
      { userId: "123" },
      (process.env.SECRET_REFRESH_KEY = "secret-test"),
    );

    const result = await sut.execute(token);

    expect(result).toEqual({
      userId: "123",
      iat: expect.any(Number),
    });
  });
});
