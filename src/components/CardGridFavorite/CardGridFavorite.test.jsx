import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CardGridFavorite } from "./CardGridFavorite";

vi.mock("../GameCardMedium/GameCardMedium.jsx", () => ({
  default: ({ gameId, name, price, image, genres, releaseDate, onClick, isFavorite }) => (
    <div data-testid={`card-${gameId}`}>
      <div onClick={onClick} data-testid="favorite-click-area">
        {isFavorite && <span data-testid="favorite-icon">★</span>}
      </div>
      <span data-testid="game-name">{name}</span>
      <span data-testid="game-price">USD$ {price}</span>
      <span data-testid="game-genres">{genres?.join(", ")}</span>
      {releaseDate && <span data-testid="release-date">{releaseDate}</span>}
      <img src={image} alt={name} data-testid="game-image" />
    </div>
  ),
}));

const mockGames = [
  { 
    id: 1, 
    Name: "Zelda", 
    Image: "/zelda.jpg", 
    Price: 59.99,
    Genres: ["Action", "Adventure"],
    ReleaseDate: "2023-05-12"
  },
  { 
    id: 2, 
    Name: "Mario", 
    Image: "/mario.jpg", 
    Price: 49.99,
    Genres: ["Platformer"],
    ReleaseDate: "2023-08-20"
  },
];

describe("CardGridFavorite component", () => {
  it("Should render all games", () => {
    render(
      <MemoryRouter>
        <CardGridFavorite games={mockGames} isFavorite={() => false} />
      </MemoryRouter>
    );
    expect(screen.getByText("Zelda")).toBeInTheDocument();
    expect(screen.getByText("Mario")).toBeInTheDocument();
    expect(screen.getByText("Action, Adventure")).toBeInTheDocument();
    expect(screen.getByText("Platformer")).toBeInTheDocument();
  });

  it("Should call toggleFavorite when clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockIsFavorite = vi.fn(() => false);
    
    render(
      <MemoryRouter>
        <CardGridFavorite 
          games={mockGames} 
          toggleFavorite={mockToggle}
          isFavorite={mockIsFavorite}
        />
      </MemoryRouter>
    );
    
    const favoriteAreas = screen.getAllByTestId("favorite-click-area");
    await user.click(favoriteAreas[0]);
    
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it("Should show favorite icon when game is favorite", () => {
    const mockIsFavorite = vi.fn((id) => id === 1);
    
    render(
      <MemoryRouter>
        <CardGridFavorite 
          games={mockGames} 
          isFavorite={mockIsFavorite}
        />
      </MemoryRouter>
    );
    
    const favoriteIcons = screen.getAllByTestId("favorite-icon");
    expect(favoriteIcons).toHaveLength(1);
  });

  it("Should apply animations when animated prop is true", () => {
    render(
      <MemoryRouter>
        <CardGridFavorite games={mockGames} animated={true} isFavorite={() => false} />
      </MemoryRouter>
    );
    const animatedDivs = document.querySelectorAll(".animate-card");
    expect(animatedDivs).toHaveLength(2);
  });

  it("Should not apply animations by default", () => {
    render(
      <MemoryRouter>
        <CardGridFavorite games={mockGames} isFavorite={() => false} />
      </MemoryRouter>
    );
    const animatedDivs = document.querySelectorAll(".animate-card");
    expect(animatedDivs).toHaveLength(0);
  });

  it("Should render release date when available", () => {
    render(
      <MemoryRouter>
        <CardGridFavorite games={mockGames} isFavorite={() => false} />
      </MemoryRouter>
    );
    expect(screen.getByText("2023-05-12")).toBeInTheDocument();
    expect(screen.getByText("2023-08-20")).toBeInTheDocument();
  });
});