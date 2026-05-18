import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "./FavoriteButton";

vi.mock("../../assets/heart-pixel.svg", () => ({ default: "heart-icon.svg" }));
vi.mock("../../assets/broken-heart-pixel.svg", () => ({ default: "broken-heart-icon.svg" }));

describe("FavoriteButton component", () => {
  it("Should render heart icon when isAdded is false", () => {
    render(<FavoriteButton isAdded={false} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "heart-icon.svg");
  });

  it("Should render broken heart icon when isAdded is true", () => {
    render(<FavoriteButton isAdded={true} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "broken-heart-icon.svg");
  });

  it("Should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    
    render(<FavoriteButton onClick={mockOnClick} />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Should apply extraStyles to button", () => {
    render(<FavoriteButton extraStyles="mt-4 ml-2" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("mt-4");
    expect(button).toHaveClass("ml-2");
  });
});