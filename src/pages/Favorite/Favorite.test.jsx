import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Favorite from "./Favorite";
import useFavorite from "../../hooks/useFavorite.jsx";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("../../hooks/useFavorite.jsx", () => ({
  default: vi.fn(),
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

  it("Render loader spinner when loading is true", () => {
    useFavorite.mockReturnValue({
      favoriteGames: [],
      loading: true,
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(<MemoryRouter><Favorite/></MemoryRouter>);
    expect(screen.getByText("Loader")).toBeInTheDocument();
  });


  
  it("Render message when no favorites", () => {
    useFavorite.mockReturnValue({
      favoriteGames: [],
      loading: false,
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(<MemoryRouter><Favorite/></MemoryRouter>);
    expect(screen.getByText("favorite.favNoGameInfo")).toBeInTheDocument();
    expect(screen.getByText("favorite.favExploreText")).toBeInTheDocument();
  });



  it("Render link to Home", () => {
    useFavorite.mockReturnValue({
      favoriteGames: [],
      loading: false,
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    });

    render(<MemoryRouter><Favorite/></MemoryRouter>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});