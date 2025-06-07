import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchUsers } from "./method";
import { http } from "./http";

vi.mock("./http");

describe("searchUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call GitHub search API and return detailed users", async () => {
    const mockUser = { login: "testuser" };
    const mockUserDetails = { login: "testuser", id: 1 };
    const mockResponse = {
      total_count: 1,
      incomplete_results: false,
      items: [mockUser],
    };
    (http.get as any)
      .mockResolvedValueOnce({ data: mockResponse })
      .mockResolvedValueOnce({ data: mockUserDetails });

    const req = { query: "test", page: 1, perPage: 1 };
    const result = await searchUsers(req);
    expect(http.get).toHaveBeenCalledWith("/search/users", {
      params: { q: "test", page: 1, per_page: 1 },
    });
    expect(result.items[0]).toEqual(mockUserDetails);
  });
});
