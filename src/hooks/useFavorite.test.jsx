import { renderHook, act, render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useFavorite from './useFavorite';

// Mock de localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        clear: vi.fn(() => { store = {}; })
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

vi.mock('../services/getDataByID', () => ({
    getDataByID: vi.fn()
}));

import { getDataByID } from '../services/getDataByID';

beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
});

describe('useFavorite', () => {

    it('Initialization with empty array', () => {
        const { result } = renderHook(() => useFavorite());
        
        expect(result.current.favoriteIds).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    it('Should return whether the item is in favorite or not', async () => {
        localStorageMock.setItem('favorites', JSON.stringify(["1"]));
        
        const { result } = renderHook(() => useFavorite());
        
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        
        expect(result.current.isFavorite("1")).toBe(true);
        expect(result.current.isFavorite("3")).toBe(false);
    });

    it('Should add favorites to localStorage', () => {
        const { result } = renderHook(() => useFavorite());
        const { toggleFavorite } = result.current;

        const initialStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
        expect(initialStorage).toEqual([]);

        act(() => {
            toggleFavorite("1");
        });

        const updatedStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
        expect(updatedStorage).toEqual([1]);
    });

    it('Should delete favorites', () => {
        localStorage.setItem('favorites', JSON.stringify(["1", "5"]));
        
        const { result } = renderHook(() => useFavorite());
        const { toggleFavorite } = result.current;

        const initialStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
        expect(initialStorage).toEqual(["1", "5"]);

        act(() => {
            toggleFavorite("1");
        });

        const updatedStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
        expect(updatedStorage).toEqual([5]);
    });
});