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

    const mockGames = [
      {
        id: 1,
        Name: "Grand Theft Auto V",
      },
    ];

    fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockGames),
    });

    const result = await getData();

    expect(fetch).toHaveBeenCalledWith("https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games?page=1&limit=60");
    expect(result).toEqual(mockGames);
  });



  it("Uses custom page and limit", async () => {

    fetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue([]),
    });

    await getData({
      page: 2,
      limit: 10,
    });

    expect(fetch).toHaveBeenCalledWith("https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games?page=2&limit=10");
  });



  it("Handles fetch errors correctly", async () => {

    const error = new Error("Fetch failed");

    fetch.mockRejectedValue(error);

    const result = await getData();

    expect(console.error).toHaveBeenCalledWith(error);
    expect(result).toBeUndefined();
  });
});