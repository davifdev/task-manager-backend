/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",

    globals: true,

    fileParallelism: false,

    setupFiles: ["vitest.setup.ts"],

    globalSetup: ["vitest.global.setup.ts"],

    include: ["src/**/*.{spec,test}.{ts, tsx}"],

    testTimeout: 10000,

    coverage: {
      reportsDirectory: "./coverage",

      provider: "v8",

      include: ["src/**/*.{ts, tsx}"],

      exclude: [
        "**/*.test.{ts}",
        "**/*.spec.{ts}",

        "**/types/**",
        "**/*.d.ts",
        "**/*.type.{ts,tsx}",
        "**/*.types.{ts,tsx}",
        "**/*.contract.{ts,tsx}",
        "**/*.protocol.{ts,tsx}",
        "**/*.interface.{ts,tsx}",

        "**/*.mock.{ts,tsx}",
        "**/*.mocks.{ts,tsx}",
        "**/mocks/**",
        "**/__mocks__/**",
        "**/__tests__/**",
        "**/__test-utils__/**",
        "**/*.test-util.ts",
      ],
    },
  },
});
