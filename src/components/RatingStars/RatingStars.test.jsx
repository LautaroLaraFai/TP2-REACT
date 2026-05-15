import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import RatingStars from "./RatingStars";

describe("RatingStars component", () => {
  it("Should render empty stars when rating is 0", () => {
    render(<RatingStars rating={0} maxStars={5} />);
    expect(screen.getByText("☆☆☆☆☆")).toBeInTheDocument();
  });

  it("Should render empty stars when rating is null", () => {
    render(<RatingStars rating={null} maxStars={5} />);
    expect(screen.getByText("☆☆☆☆☆")).toBeInTheDocument();
  });

  it("Should render full stars according to rating", () => {
    render(<RatingStars rating={3} maxStars={5} />);
    expect(screen.getByText("★★★☆☆")).toBeInTheDocument();
  });

  it("Should cap rating at maxStars", () => {
    render(<RatingStars rating={7} maxStars={5} />);
    expect(screen.getByText("★★★★★")).toBeInTheDocument();
  });

  it("Should apply starColor class", () => {
    render(<RatingStars rating={4} starColor="text-yellow-500" />);
    const element = screen.getByText("★★★★☆");
    expect(element).toHaveClass("text-yellow-500");
  });

  it("Should apply size class", () => {
    render(<RatingStars rating={4} size="text-2xl" />);
    const element = screen.getByText("★★★★☆");
    expect(element).toHaveClass("text-2xl");
  });

  it("Should use default values when props not provided", () => {
    render(<RatingStars rating={3} />);
    const element = screen.getByText("★★★☆☆");
    expect(element).toHaveClass("text-orange-700");
    expect(element).toHaveClass("text-xl");
  });
});