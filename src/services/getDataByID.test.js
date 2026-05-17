import { describe, expect, it, vi } from "vitest";
import { getDataByID } from "./getDataByID";

describe("getDataByID", () => {
  it("Should return game data when fetch is successful", async () => {
    const mockGame = { id: 1, Name: "Zelda", Price: 59.99 };
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGame),
      })
    );

    const result = await getDataByID(1);
    
    expect(result).toEqual(mockGame);
    expect(fetch).toHaveBeenCalledWith("https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games/1");
  });

  it("Should return null when response is 404", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    const result = await getDataByID(999);
    
    expect(result).toBeNull();
  });

  it("Should return null when fetch fails", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    const result = await getDataByID(1);
    
    expect(result).toBeNull();
  });
});