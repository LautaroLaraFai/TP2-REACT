import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import usePageOfData from "./usePageOfData";
import getData from "../services/getData";

vi.mock("../services/getData");

const mockGames = [
    { id: 1, name: "Grand Theft Auto V" },
    { id: 2, name: "Mario" },
    { id: 3, name: "Zelda" }
];

getData.mockResolvedValue(mockGames);    //para que resuelva la promesa con mockGame

describe('UsePageOfData', () => {
    it('Should call with page 1 and limit 6', () => {
        const { result } = renderHook(() => usePageOfData())
        const parameters = {
            "limit": 6,
            "page": 1
        }
        expect(getData).toHaveBeenCalledWith(parameters)
    })

    it('Random game should not be null', async () => {
        getData.mockResolvedValue(mockGames);
        const { result } = renderHook(() => usePageOfData());

        await waitFor(() => {
            expect(result.current.games.length).toBe(3);
        });
        
        expect(result.current.frontPageGame).not.toBeNull();
    });
})