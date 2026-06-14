import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageGallery from "./ImageGallery";

const mockGameWithImages = {
  Image: "/main-image.jpg",
  screenshots: [{ imageUrl: "/screenshot1.jpg" }, { imageUrl: "/screenshot2.jpg" }],
};

const mockGameWithoutImages = {
  Image: null,
  screenshots: [],
};

describe("ImageGallery component", () => {
  it("Should render the main image", () => {
    render(<ImageGallery game={mockGameWithImages} />);
    const img = screen.getByAltText("Game screenshot");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("/main-image.jpg");
  });

  it("Should return null when no images", () => {
    const { container } = render(<ImageGallery game={mockGameWithoutImages} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Should change image when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<ImageGallery game={mockGameWithImages} />);
    
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];
    await user.click(nextButton);
    
    const img = screen.getByAltText("Game screenshot");
    expect(img.getAttribute("src")).toBe("/screenshot1.jpg");
  });

  it("Should change image when clicking on thumbnail", async () => {
    const user = userEvent.setup();
    render(<ImageGallery game={mockGameWithImages} />);
    
    const thumbnails = screen.getAllByRole("button").slice(2);
    await user.click(thumbnails[0]);
    
    const img = screen.getByAltText("Game screenshot");
    expect(img.getAttribute("src")).toBe("/screenshot1.jpg");
  });
});