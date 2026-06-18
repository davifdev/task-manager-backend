import { PasswordCompareAdapter } from "./password-compare";
import bcrypt from "bcrypt";

describe("PasswordCompareAdapter", () => {
  it("should verify password when successfully", async () => {
    const sut = new PasswordCompareAdapter();
    const password = "123456";
    const passwordHasher = bcrypt.hashSync(password, 10);

    const result = await sut.execute(password, passwordHasher);

    expect(result).toBeTruthy();
  });
});
