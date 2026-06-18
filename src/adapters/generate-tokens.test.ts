import { faker } from "@faker-js/faker";
import { GenerateTokensAdapter } from "./generate-tokens";

describe("GenerateTokensAdapter", () => {
  it("should generate tokens with success", () => {
    const userId = faker.string.uuid();
    const sut = new GenerateTokensAdapter();

    const result = sut.execute(userId);

    expect(result).toBeTruthy();
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });
});
