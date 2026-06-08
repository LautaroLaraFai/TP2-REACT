import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import getData from "./getData";

describe("getData", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Returns game data correctly", async () => {
    const mockResponse = {
      data: [{ id: 55, Name: "Grand Theft Auto V" }],
      nextCursor: 56,
      hasMore: true,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await getData();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/games?limit=20");
    expect(result).toEqual(mockResponse);
  });

  it("Uses custom cursor and limit", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ data: [], nextCursor: null, hasMore: false }),
    });

    await getData({ cursor: 55, limit: 10 });

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/games?cursor=55&limit=10");
  });

  it("Handles fetch errors", async () => {
    fetch.mockRejectedValue(new Error("Fetch failed"));

    const result = await getData();

    expect(result).toEqual({ data: [], nextCursor: null, hasMore: false });
  });
});