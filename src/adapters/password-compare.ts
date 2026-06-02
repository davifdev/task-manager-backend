import bcrypt from "bcrypt";

export class PasswordCompareAdapter {
  async execute(password: string, passwordCompare: string) {
    return await bcrypt.compare(password, passwordCompare);
  }
}
