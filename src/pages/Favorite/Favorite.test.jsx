import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Favorite from "./Favorite";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: "es",
      changeLanguage: vi.fn(),
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: vi.fn(),
  },
  Trans: ({ children }) => children,
}));

vi.mock("../../context/FavoriteContext", () => ({
  useFavorites: vi.fn(),
}));

vi.mock("../../services/hydrateFavorites.js", () => ({
  hydrateFavorites: vi.fn(),
}));

vi.mock("../../layouts/Section.jsx", () => ({
  default: ({ children }) => <section>{children}</section>,
}));

vi.mock("../../components/Loader/Loader.jsx", () => ({
  default: () => <div>Loader</div>,
}));

vi.mock("../../components/CardGridFavorite/CardGridFavorite.jsx", () => ({
  CardGridFavorite: () => <div>CardGridFavorite</div>,
}));

describe("Favorite Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Render loader spinner when loading is true", async () => {
    const { useFavorites } = await import("../../context/FavoriteContext");
    const { hydrateFavorites } = await import("../../services/hydrateFavorites.js");

    useFavorites.mockReturnValue({
      favorites: [1],
      toggleFavorite: vi.fn(),
    });

    hydrateFavorites.mockImplementation(() => new Promise(() => {}));

    render(<MemoryRouter><Favorite/></MemoryRouter>);
    expect(screen.getByText("Loader")).toBeInTheDocument();
  });

  it("Render message when no favorites", async () => {
    const { useFavorites } = await import("../../context/FavoriteContext");

    useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
    });

    render(<MemoryRouter><Favorite/></MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText("favorite.favNoGameInfo")).toBeInTheDocument();
      expect(screen.getByText("favorite.favExploreText")).toBeInTheDocument();
    });
  });

  it("Render link to Home", async () => {
    const { useFavorites } = await import("../../context/FavoriteContext");

    useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
    });

    render(<MemoryRouter><Favorite/></MemoryRouter>);

    await waitFor(() => {
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/");
    });
  });
});