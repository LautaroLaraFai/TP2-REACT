import { describe, expect, it, vi } from "vitest";
import getDataByFilter from "./getDataByFilter";

describe('getDataByFilter', () => {
    it('Should call with the correct values', async () => {
        const mockGame = [{ id: 1, Name: "Outer Wilds", price: 10}]

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockGame),
            })
        );
        const param = "Name"
        const value = "Outer Wilds"

        const result = await getDataByFilter(param, value)

        expect(result).toEqual(mockGame)
        expect(fetch).toHaveBeenCalledWith(`https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games?${param}=${value}`)
    })

    it('Should return empty array if ok is false', async () => {
        const mockGame = [{ id: 1, Name: "Outer Wilds", price: 10}]

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve(mockGame),
            })
        );
        const param = "Name"
        const value = "Outer Wilds"

        const result = await getDataByFilter(param, value) 
        
        expect(result).toEqual([])
    })

    it('Should return empty array if there were no games found', async () => {
        const mockGame = []

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockGame),
            })
        );
        const param = "Name"
        const value = "FMAKOSLFMDSKLFMEWNFMOÉF,COWEPFMOWM,OQÑA"

        const result = await getDataByFilter(param, value) 
        
        expect(result).toEqual([])
    })
    
})