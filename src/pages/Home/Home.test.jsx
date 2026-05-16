import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "./Home";

//? 't' devuelve 'key'
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("../../hooks/useFavorite.jsx", () => ({
  default: () => ({
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(() => false),
  }),
}));

vi.mock("../../hooks/usePageOfData.jsx", () => ({
  default: () => ({
    games: [
      {
        id: 1,
        Name: "Cyberpunk 2077",
      },
    ],
    fetchData: vi.fn(),
    hasMore: true,
    frontPageGame: {
      id: 10,
      Name: "The Witcher 3",
      Description: "Open world RPG",
      Price: 59.99,
      Image: "image.jpg",
    },
  }),
}));

vi.mock("../../components/GameCardLarge/GameCardLarge.jsx", () => ({
  default: ({ name }) => <div>{name}</div>,
}));

vi.mock("../../components/CardGrid/CardGrid.jsx", () => ({
  default: ({ games }) => (
    <div>
      {games.map((game) => (
        <span key={game.id}>{game.Name}</span>
      ))}
    </div>
  ),
}));

vi.mock("../../layouts/Section.jsx", () => ({
  default: ({ children, title }) => (
    <section>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  ),
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

  beforeEach(() => {
    vi.clearAllMocks();
  });


  
  it("Renderiza correctamente el juego principal", () => {
    render(<Home/>);

    expect(screen.getByText("The Witcher 3")).toBeInTheDocument();
  });



  it("Renderiza correctamente la grilla de juegos", () => {
    render(<Home/>);

    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
  });



  it("Renderiza correctamente el título de recomendaciones", () => {
    render(<Home/>);

    expect(screen.getByText("home.recommendations")).toBeInTheDocument();
  });



  it("Renderiza correctamente el loader", () => {
    render(<Home/>);

    expect(screen.getByText("Loader")).toBeInTheDocument();
  });



  it("Renderiza correctamente el mensaje final", () => {
    render(<Home/>);

    expect(screen.getByText("home.seenAllText")).toBeInTheDocument();
  });
});