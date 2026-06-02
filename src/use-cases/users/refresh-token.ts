import type { GenerateTokensAdapter } from "../../adapters/generate-tokens";
import type { VerifyTokenAdapter } from "../../adapters/verify-token";
export class RefreshTokenUseCase {
  private readonly generateTokensAdapter;
  private readonly verifyTokenAdapter;

  constructor(
    generateTokensAdapter: GenerateTokensAdapter,
    verifyTokenAdapter: VerifyTokenAdapter,
  ) {
    this.generateTokensAdapter = generateTokensAdapter;
    this.verifyTokenAdapter = verifyTokenAdapter;
  }

  async execute(refreshToken: string) {
    const payload = await this.verifyTokenAdapter.execute(refreshToken);
    const tokens = this.generateTokensAdapter.execute(payload.userId);

    return {
      tokens,
    };
  }
}
