import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import usePageOfData from "./usePageOfData";
import getData from "../services/getData";

vi.mock("../services/getData");

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
    },
  }),
}));

const mockResponse = {
  data: [
    { id: 1, name: "Grand Theft Auto V" },
    { id: 2, name: "Mario" },
    { id: 3, name: "Zelda" },
  ],
  nextCursor: 3,
  hasMore: false,
};

describe("UsePageOfData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getData.mockResolvedValue(mockResponse);
  });

  it("Should call getData with limit 20", async () => {
    renderHook(() => usePageOfData());

    await waitFor(() => {
      expect(getData).toHaveBeenCalledWith({
        limit: 20,
      });
    });
  });

  it("Random game should not be null", async () => {
    const { result } = renderHook(() => usePageOfData());

    await waitFor(() => {
      expect(result.current.games.length).toBe(3);
    });

    expect(result.current.frontPageGame).not.toBeNull();
  });
});