import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

    it('Initialization with empty array and loading false', () => {
        const { result } = renderHook(() => useFavorite());
        
        expect(result.current.favoriteIds).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    it()
});