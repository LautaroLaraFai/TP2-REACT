import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Detail from "./Detail";
import useFavorite from "../../hooks/useFavorite.jsx";

const mockNavigate = vi.fn();
const mockToggleFavorite = vi.fn();

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

vi.mock("../../hooks/useFavorite.jsx", () => ({
  default: vi.fn(),
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


describe("Detail Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("Render loader spinner when loading is true", () => {
    useFavorite.mockReturnValue({
      loading: true,
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
    });

    render(<MemoryRouter><Detail/></MemoryRouter>);
    expect(screen.getByText("detail.loadingText")).toBeInTheDocument();
  });



  it("Render basic game info", () => {
    useFavorite.mockReturnValue({
      loading: false,
      isFavorite: vi.fn(() => false),
      toggleFavorite: mockToggleFavorite,
    });

    render(<MemoryRouter><Detail/></MemoryRouter>);
    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
    expect(screen.getByText("Open world futuristic RPG")).toBeInTheDocument();
  });



  it("Execute toggleFavorite when clicking favorite button", async () => {
    useFavorite.mockReturnValue({
      loading: false,
      isFavorite: vi.fn(() => false),
      toggleFavorite: mockToggleFavorite,
    });

    const user = userEvent.setup();

    render(<MemoryRouter><Detail/></MemoryRouter>);

    const favoriteButton = screen.getAllByRole("button")[0];

    await user.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });
});