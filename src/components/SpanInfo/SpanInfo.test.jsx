import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import SpanInfo from "./SpanInfo";

describe("SpanInfo component", () => {
  it("Should render label and data", () => {
    render(<SpanInfo label="Price:" textColor="text-green-500" data="$59.99" />);
    
    expect(screen.getByText("Price:")).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
  });

  it("Should apply textColor class to data", () => {
    render(<SpanInfo label="Genre:" textColor="text-red-500" data="Action" />);
    
    const dataElement = screen.getByText("Action");
    expect(dataElement).toHaveClass("text-red-500");
  });

  it("Should not apply textColor class to label", () => {
    render(<SpanInfo label="Release:" textColor="text-blue-500" data="2024" />);
    
    const labelElement = screen.getByText("Release:");
    expect(labelElement).not.toHaveClass("text-blue-500");
  });
});