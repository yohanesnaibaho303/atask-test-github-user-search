import { describe, it, expect } from "vitest";
import { http } from "../src/api/http";

// Integration-like test: hits GitHub API
describe("GitHub API /search/users (integration-like)", () => {
  it("should return users from the GitHub API", async () => {
    const res = await http.get("/search/users", {
      params: { q: "octocat", page: 1, per_page: 1 },
    });
    expect(res.data.items).toBeDefined();
    expect(Array.isArray(res.data.items)).toBe(true);
    expect(res.data.items.length).toBeGreaterThan(0);
  });
});
