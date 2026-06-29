import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Detail from "./Detail";

const mockNavigate = vi.fn();

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

vi.mock("react-router", () => ({
  useParams: () => ({
    id: "1",
  }),
  useNavigate: () => mockNavigate,
}));

vi.mock("../../context/FavoriteContext", () => ({
  useFavorites: vi.fn(),
}));

vi.mock("../../services/validateGameId.js", () => ({
  validateGameId: vi.fn(),
}));

vi.mock("../../services/globals", () => ({
  useGamesByID: () => ({
    id: 1,
    Name: "Cyberpunk 2077",
    Price: 59.99,
    Developer: "CD Projekt Red",
    ReleaseDate: "2020",
    Rating: 5,
    Genres: ["RPG", "Action"],
    description: "Open world futuristic RPG",
  }),
}));

vi.mock("../../components/ImagenGallery/ImageGallery.jsx", () => ({
  default: () => <div>ImageGallery</div>,
}));

vi.mock("../../components/SpanInfo/SpanInfo.jsx", () => ({
  default: ({ data }) => <div>{data}</div>,
}));

vi.mock("../../components/RatingStars/RatingStars.jsx", () => ({
  default: () => <div>RatingStars</div>,
}));

vi.mock("../../components/PdfGenerator/PdfGenerator.jsx", () => ({
  PDFDownloadButton: () => <button>PDF Button</button>,
}));

vi.mock("../../components/FavoriteButton/FavoriteButton.jsx", () => ({
  default: () => <button>Favorite Button</button>,
}));

describe("Detail Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Render loader spinner when loading is true", async () => {
    const { useFavorites } = await import("../../context/FavoriteContext");

    useFavorites.mockReturnValue({
      loading: true,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    });

    render(<MemoryRouter><Detail/></MemoryRouter>);
    expect(screen.getByText("detail.loadingText")).toBeInTheDocument();
  });

  it("Render basic game info", async () => {
    const { useFavorites } = await import("../../context/FavoriteContext");

    useFavorites.mockReturnValue({
      loading: false,
      isFavorite: vi.fn(() => false),
      toggleFavorite: vi.fn(),
    });

    render(<MemoryRouter><Detail/></MemoryRouter>);
    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
    expect(screen.getByText("Open world futuristic RPG")).toBeInTheDocument();
    expect(screen.getByText("ImageGallery")).toBeInTheDocument();
    expect(screen.getByText("PDF Button")).toBeInTheDocument();
    expect(screen.getByText("Favorite Button")).toBeInTheDocument();
  });
});