import { describe, expect, it, vi, beforeEach } from "vitest";
import getDataByFilter from "./getDataByFilter";

describe('getDataByFilter', () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('Should call with the correct values', async () => {
    const mockGames = [{ id: 1, Name: "Outer Wilds", Price: 10 }];

    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGames),
    });

    const param = "Name";
    const value = "Outer Wilds";

    const result = await getDataByFilter(param, value);

    expect(result).toEqual(mockGames);
    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/games?${param}=${encodeURIComponent(value)}`);
  });

  it('Should return empty array if response is not ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await getDataByFilter("Name", "Outer Wilds");

    expect(result).toEqual([]);
  });

  it('Should return empty array if there were no games found', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const result = await getDataByFilter("Name", "FMAKOSLFMDSKLFMEWNFMOÉF,COWEPFMOWM,OQÑA");

    expect(result).toEqual([]);
  });

  it('Should handle fetch errors', async () => {
    global.fetch.mockRejectedValue(new Error("Network error"));

    const result = await getDataByFilter("Name", "Outer Wilds");

    expect(result).toEqual([]);
  });
});