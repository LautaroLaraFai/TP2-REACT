import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Outlet Component</div>,
  };
});

vi.mock("../components/Header/Header.jsx", () => ({
  default: () => (
    <div data-testid="mock-header">Header Component</div>
  ),
}));

vi.mock("../components/Footer/Footer.jsx", () => ({
  Footer: () => <div data-testid="mock-footer">Footer Component</div>,
}));

vi.mock("../components/SearchResults/SearchResults.jsx", () => ({
  default: () => (
    <div data-testid="mock-search-results">Search Results Component</div>
  ),
}));

vi.mock("../context/FavoriteContext.jsx", () => ({
  useFavorites: () => ({
    toggleFavorite: vi.fn(),
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("MainLayout component", () => {
  it("Should render outlet content when searchActive is false", () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  it("Should not render SearchResults when searchActive is false", () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );
    
    const searchResults = screen.queryByTestId("mock-search-results");
    expect(searchResults).not.toBeInTheDocument();
  });

  it("Should not render header when showHeader is false", () => {
    render(
      <MemoryRouter>
        <MainLayout showHeader={false} />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
  });

  it("Should not render footer when showFooter is false", () => {
    render(
      <MemoryRouter>
        <MainLayout showFooter={false} />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("mock-footer")).not.toBeInTheDocument();
  });

  it("Should still render outlet when showFooter is false", () => {
    render(
      <MemoryRouter>
        <MainLayout showFooter={false} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});