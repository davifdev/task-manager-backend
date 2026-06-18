import { GenerateIdAdapter } from "./generate-id";
import validator from "validator";

describe("GenerateIdAdapter", () => {
  it("should generate uuid when successfully", () => {
    const sut = new GenerateIdAdapter();

    const result = sut.execute();

    expect(result).toBeTruthy();
    expect(validator.isUUID(result));
  });
});
