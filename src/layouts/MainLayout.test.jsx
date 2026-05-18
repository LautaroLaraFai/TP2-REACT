import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

vi.mock("../components/Header/Header.jsx", () => ({
  default: ({ setSearchActive, setFilteredGames, clearInput, setClearInput, setIsLoading }) => (
    <div data-testid="mock-header">Header Component</div>
  ),
}));

vi.mock("../components/Footer/Footer.jsx", () => ({
  Footer: () => <div data-testid="mock-footer">Footer Component</div>,
}));

vi.mock("../components/SearchResults/SearchResults.jsx", () => ({
  default: ({ isLoading, filteredGames, disableSearch, toggleFavorite, isFavorite }) => (
    <div data-testid="mock-search-results">Search Results Component</div>
  ),
}));

vi.mock("../hooks/useFavorite.jsx", () => ({
  default: () => ({
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(() => false),
    loading: false,
    setLoading: vi.fn(),
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("MainLayout component", () => {
  it("Should render children when searchActive is false", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div data-testid="test-child">Child Content</div>
        </MainLayout>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  it("Should not render SearchResults when searchActive is false", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div>Child Content</div>
        </MainLayout>
      </MemoryRouter>
    );
    
    const searchResults = screen.queryByTestId("mock-search-results");
    expect(searchResults).not.toBeInTheDocument();
  });
});