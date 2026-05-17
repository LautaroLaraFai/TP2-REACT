import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GameCardSmall from "./GameCardSmall";

describe("GameCardSmall Component", () => {

  const defaultProps = {
    name: "Cyberpunk 2077",
    price: 59.99,
    image: "https://picsum.photos/200/300",
    gameId: 1,
    isFavorite: false,
    onClick: vi.fn(),
    disableSearch: vi.fn(),
  };



  it("Correctly renders the game name", () => {
    render(
      //? Necesita MemoryRouter porque GameCardSmall funciona con Link, que funciona dentro de React Router
      <MemoryRouter>
        <GameCardSmall {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
  });



  it("Correctly renders the price", () => {
    render(
      <MemoryRouter>
        <GameCardSmall {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText("USD$ 59.99")).toBeInTheDocument();
  });



  it("Correctly renders the image", () => {
    render(
      <MemoryRouter>
        <GameCardSmall {...defaultProps} />
      </MemoryRouter>
    );

    const images = screen.getAllByRole("img");
    
    expect(images[0]).toBeInTheDocument();
    expect(images[0]).toHaveAttribute(
      "src",
      "https://picsum.photos/200/300"
    );
  });



  it("Renders the link to the game detail page", () => {
    render(
      <MemoryRouter>
        <GameCardSmall {...defaultProps} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/detail/1");
  });


  
  it("Executes onClick when clicking the favorites button", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <GameCardSmall
          {...defaultProps}
          onClick={onClick}
        />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(onClick).toHaveBeenCalledTimes(1);
  });



  it("Executes disableSearch when clicking the link", async () => {
    const disableSearch = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <GameCardSmall
          {...defaultProps}
          disableSearch={disableSearch}
        />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link"));

    expect(disableSearch).toHaveBeenCalledTimes(1);
  });
});