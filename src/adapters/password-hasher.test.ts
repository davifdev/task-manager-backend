import { PasswordHasherAdapter } from "./password-hasher";

describe("PasswordHasherAdapter", () => {
  it("should return password hashed", async () => {
    const sut = new PasswordHasherAdapter();
    const password = "123456789";

    const result = await sut.execute(password);

    expect(result).toBeTruthy();
    expect(result).not.toBe(password);
  });
});
