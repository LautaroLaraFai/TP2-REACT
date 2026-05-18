import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CardGrid from "./CardGrid";

vi.mock("../GameCardSmall/GameCardSmall.jsx", () => ({
  default: ({ gameId, name, price, image, onClick, isFavorite, disableSearch }) => (
    <div data-testid={`card-${gameId}`}>
      <div onClick={onClick} data-testid="favorite-click-area">
        {isFavorite && <span data-testid="favorite-icon">★</span>}
      </div>
      <span>{name}</span>
      <span>USD$ {price}</span>
    </div>
  ),
}));

const mockGames = [
  { id: 1, Name: "Zelda", Image: "/zelda.jpg", Price: 59.99 },
  { id: 2, Name: "Mario", Image: "/mario.jpg", Price: 49.99 },
];

describe("CardGrid component", () => {
  it("Should render all games", () => {
    render(
      <MemoryRouter>
        <CardGrid games={mockGames} />
      </MemoryRouter>
    );
    expect(screen.getByText("Zelda")).toBeInTheDocument();
    expect(screen.getByText("Mario")).toBeInTheDocument();
  });

  it("Should call toggleFavorite when clicked", async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    
    render(
      <MemoryRouter>
        <CardGrid games={mockGames} toggleFavorite={mockToggle} />
      </MemoryRouter>
    );
    
    const favoriteAreas = screen.getAllByTestId("favorite-click-area");
    await user.click(favoriteAreas[0]);
    
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it("Should apply animations when animated prop is true", () => {
    render(
      <MemoryRouter>
        <CardGrid games={mockGames} animated={true} />
      </MemoryRouter>
    );
    const animatedDivs = document.querySelectorAll(".animate-card");
    expect(animatedDivs).toHaveLength(2);
  });

  it("Should not apply animations by default", () => {
    render(
      <MemoryRouter>
        <CardGrid games={mockGames} />
      </MemoryRouter>
    );
    const animatedDivs = document.querySelectorAll(".animate-card");
    expect(animatedDivs).toHaveLength(0);
  });
});