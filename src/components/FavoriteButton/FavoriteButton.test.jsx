import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "./FavoriteButton";

vi.mock("../../assets/heart-pixel.svg", () => ({ default: "heart-icon.svg" }));
vi.mock("../../assets/broken-heart-pixel.svg", () => ({ default: "broken-heart-icon.svg" }));

const mockHandleFavoriteClick = vi.fn();

vi.mock("../../hooks/useOptimisticFavorite.js", () => ({
  useOptimisticFavorite: vi.fn(() => ({
    optimisticFavorite: false,
    handleFavoriteClick: mockHandleFavoriteClick,
  })),
}));

describe("FavoriteButton component", () => {
  it("Should render heart icon when optimisticFavorite is false", async () => {
    const { useOptimisticFavorite } = await import("../../hooks/useOptimisticFavorite.js");

    useOptimisticFavorite.mockReturnValue({
      optimisticFavorite: false,
      handleFavoriteClick: mockHandleFavoriteClick,
    });

    render(<FavoriteButton gameId={1} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "heart-icon.svg");
  });

  it("Should render broken heart icon when optimisticFavorite is true", async () => {
    const { useOptimisticFavorite } = await import("../../hooks/useOptimisticFavorite.js");

    useOptimisticFavorite.mockReturnValue({
      optimisticFavorite: true,
      handleFavoriteClick: mockHandleFavoriteClick,
    });

    render(<FavoriteButton gameId={1} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "broken-heart-icon.svg");
  });

  it("Should call handleFavoriteClick when clicked", async () => {
    const user = userEvent.setup();

    render(<FavoriteButton gameId={1} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockHandleFavoriteClick).toHaveBeenCalledTimes(1);
  });

  it("Should apply extraStyles to button", () => {
    render(<FavoriteButton gameId={1} extraStyles="mt-4 ml-2" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("mt-4");
    expect(button).toHaveClass("ml-2");
  });
});