import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GameCardMedium from "./GameCardMedium";

describe("GameCardMedium Component", () => {
  
  const defaultProps = {
    name: "Cyberpunk 2077",
    price: 59.99,
    genres: ["RPG", "Action"],
    image: "https://picsum.photos/200/300",
    releaseDate: "2020-12-10",
    isFavorite: false,
    gameId: 1,
    onClick: vi.fn(),
  };

  const renderComponent = (props = {}) => {
    render(
      <MemoryRouter>
        <GameCardMedium {...defaultProps} {...props} />
      </MemoryRouter>
    );
  };

  it("Correctly renders the game name", () => {
    renderComponent();
    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
  });

  it("Correctly renders the price", () => {
    renderComponent();
    expect(screen.getByText("USD$ 59.99")).toBeInTheDocument();
  });

  it("Correctly renders the genres", () => {
    renderComponent();
    expect(screen.getByText("RPG, Action")).toBeInTheDocument();
  });

  it("Correctly renders the release date", () => {
    renderComponent();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
  });

  it("Correctly renders the game image", () => {
    renderComponent();
    const image = screen.getByRole("img", {name: /Cyberpunk 2077/i,});
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://picsum.photos/200/300");
  });

  it("Correctly renders the link", () => {
    renderComponent();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/detail/1");
  });

  it("Executes onClick when clicking the favorites button", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderComponent({ onClick });
    const button = screen.getByRole("button");
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Does not render releaseDate if it does not exist", () => {
    renderComponent({ releaseDate: null });
    expect(screen.queryByText(/2020/)).not.toBeInTheDocument();
  });
});