import { afterEach } from "vitest";

import { execSync } from "child_process";

afterEach(async () => {
  execSync("docker compose -d --wait postgres-test");
  execSync("npm run migration");

  vi.resetAllMocks();
});
