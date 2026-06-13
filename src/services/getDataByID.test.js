import { describe, expect, it, vi, beforeEach } from "vitest";
import { getDataByID } from "./getDataByID";

describe("getDataByID", () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("Should return game data when fetch is successful", async () => {
    const mockGame = { 
      id: 1, 
      Name: "Zelda", 
      Price: 59.99,
      screenshots: [{ imageUrl: "url1.jpg" }, { imageUrl: "url2.jpg" }],
      genres: [{ name: "Action" }, { name: "RPG" }]
    };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGame),
    });

    const result = await getDataByID(1);
    
    expect(result).toEqual({
      ...mockGame,
      Screenshots: ["url1.jpg", "url2.jpg"],
      Genres: ["Action", "RPG"]
    });
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/games/1`);
  });

  it("Should return null when response is 404", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await getDataByID(999);
    
    expect(result).toBeNull();
  });

  it("Should return null when fetch fails", async () => {
    global.fetch.mockRejectedValue(new Error("Network error"));

    const result = await getDataByID(1);
    
    expect(result).toBeNull();
  });

  it("Should handle game without screenshots and genres", async () => {
    const mockGame = { 
      id: 2, 
      Name: "Mario", 
      Price: 49.99,
      screenshots: undefined,
      genres: undefined
    };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGame),
    });

    const result = await getDataByID(2);
    
    expect(result).toEqual(mockGame);
    expect(result.Screenshots).toBeUndefined();
    expect(result.Genres).toBeUndefined();
  });
});