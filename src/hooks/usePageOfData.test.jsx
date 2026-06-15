import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import usePageOfData from "./usePageOfData";
import getData from "../services/getData";

vi.mock("../services/getData");

const mockResponse = {
  data: [
    { id: 1, name: "Grand Theft Auto V" },
    { id: 2, name: "Mario" },
    { id: 3, name: "Zelda" }
  ],
  nextCursor: 3,
  hasMore: false
};

describe('UsePageOfData', () => {
  it('Should call with cursor null and limit 20', () => {
    renderHook(() => usePageOfData());
    expect(getData).toHaveBeenCalledWith({ cursor: null, limit: 20 });
  });

  it('Random game should not be null', async () => {
    getData.mockResolvedValue(mockResponse);
    const { result } = renderHook(() => usePageOfData());

    await waitFor(() => {
      expect(result.current.games.length).toBe(3);
    });
    
    expect(result.current.frontPageGame).not.toBeNull();
  });
});