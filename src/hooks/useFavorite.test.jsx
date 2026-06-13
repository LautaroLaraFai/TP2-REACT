import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useFavorite from './useFavorite';

describe('useFavorite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('Initialization with empty array', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    });

    const { result } = renderHook(() => useFavorite());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.favoriteIds).toEqual([]);
  });

  it('Should return whether the item is in favorite or not', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: 1, isFavorite: true }] }),
    });

    const { result } = renderHook(() => useFavorite());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isFavorite(1)).toBe(true);
    expect(result.current.isFavorite(3)).toBe(false);
  });

  it('Should add favorites', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: 1, isFavorite: false }] }),
    });

    const { result } = renderHook(() => useFavorite());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, isFavorite: true }),
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: 1, isFavorite: true }] }),
    });

    await act(async () => {
      await result.current.toggleFavorite(1);
    });

    await waitFor(() => {
      expect(result.current.isFavorite(1)).toBe(true);
    });
  });

  it('Should delete favorites', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: 1, isFavorite: true }, { id: 5, isFavorite: true }] }),
    });

    const { result } = renderHook(() => useFavorite());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, isFavorite: false }),
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [{ id: 5, isFavorite: true }] }),
    });

    await act(async () => {
      await result.current.toggleFavorite(1);
    });

    await waitFor(() => {
      expect(result.current.isFavorite(1)).toBe(false);
      expect(result.current.isFavorite(5)).toBe(true);
    });
  });
});