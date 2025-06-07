import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    environment: "node",
    globals: true,
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
