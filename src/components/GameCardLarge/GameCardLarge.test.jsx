import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GameCardLarge from "./GameCardLarge";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("GameCardLarge Component", () => {

  const defaultProps = {
    name: "Cyberpunk 2077",
    description: "Open world futuristic RPG",
    price: 59.99,
    image: "https://picsum.photos/200/300",
    isFavorite: false,
    gameId: 1,
    onClick: vi.fn(),
  };

  const renderComponent = (props = {}) => {
    render(
      <MemoryRouter>
        <GameCardLarge {...defaultProps} {...props} />
      </MemoryRouter>
    );
  };



  it("Render game name", () => {
    renderComponent();

    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
  });



  it("Render game description", () => {
    renderComponent();

    expect(screen.getByText("Open world futuristic RPG")).toBeInTheDocument();
  });



  it("Render game price", () => {
    renderComponent();

    expect(screen.getByText("USD$ 59.99")).toBeInTheDocument();
  });



  it("Render game image", () => {
    renderComponent();

    const image = screen.getByRole("img", {name: /Cyberpunk 2077/i,});
    //? La ' i ' en "/Cyberpunk 2077/i" significa 'case insensitive'

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://picsum.photos/200/300");
  });



  it("Correctly renders the store button", () => {
    renderComponent();

    expect(screen.getByText("home.gameCardLargeStore")).toBeInTheDocument();
  });



  it("Render link to game details", () => {
    renderComponent();

    const links = screen.getAllByRole("link");

    expect(
      links.some(
        (link) => link.getAttribute("href") === "/detail/1"
      )
    ).toBe(true);
  });



  it("Execute onClick when clicking favorite button", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderComponent({ onClick });

    const button = screen.getByRole("button");

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});