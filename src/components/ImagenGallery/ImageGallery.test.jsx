import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageGallery from "./ImageGallery";

const mockGameWithImages = {
  Image: "/main-image.jpg",
  Screenshots: ["/screenshot1.jpg", "/screenshot2.jpg"],
};

const mockGameWithoutImages = {
  Image: null,
  Screenshots: [],
};

describe("ImageGallery component", () => {
  it("Should render the main image", () => {
    render(<ImageGallery game={mockGameWithImages} />);
    expect(screen.getByAltText("Game screenshot")).toHaveAttribute("src", "/main-image.jpg");
  });

  it("Should return null when no images", () => {
    const { container } = render(<ImageGallery game={mockGameWithoutImages} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Should change image when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<ImageGallery game={mockGameWithImages} />);
    
    const nextButton = screen.getAllByRole("button")[1];
    await user.click(nextButton);
    
    expect(screen.getByAltText("Game screenshot")).toHaveAttribute("src", "/screenshot1.jpg");
  });

  it("Should change image when clicking on thumbnail", async () => {
    const user = userEvent.setup();
    render(<ImageGallery game={mockGameWithImages} />);
    
    const thumbnails = screen.getAllByRole("button").slice(2);
    await user.click(thumbnails[1]);
    
    expect(screen.getByAltText("Game screenshot")).toHaveAttribute("src", "/screenshot1.jpg");
  });
});