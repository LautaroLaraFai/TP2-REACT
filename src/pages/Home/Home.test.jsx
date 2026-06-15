import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./home";

//? 't' devuelve 'key'
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

vi.mock("../../hooks/useFavorite.jsx", () => ({
  default: () => ({
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(() => false),
  }),
}));

vi.mock("../../hooks/usePageOfData.jsx", () => ({
  default: () => ({
    games: [],
    fetchData: vi.fn(),
    hasMore: true,
    frontPageGame: null,
  }),
}));

vi.mock("../../components/GameCardLarge/GameCardLarge.jsx", () => ({
  default: () => <div>GameCardLarge</div>,
}));

vi.mock("../../components/CardGrid/CardGrid.jsx", () => ({
  default: () => <div>CardGrid</div>,
}));

vi.mock("../../layouts/Section.jsx", () => ({
  default: ({ children }) => <section>{children}</section>,
}));

vi.mock("../../components/Loader/Loader.jsx", () => ({
  default: () => <div>Loader</div>,
}));

vi.mock("react-infinite-scroll-component", () => ({
  default: ({ children, loader, endMessage }) => (
    <div>
      {children}
      {loader}
      {endMessage}
    </div>
  ),
}));

describe("Home Component", () => {

  it("Correctly renders the main structure", () => {
    render(<Home/>);

    expect(screen.getByText("Loader")).toBeInTheDocument();
    expect(screen.getByText("home.seenAllText")).toBeInTheDocument();
  });
});