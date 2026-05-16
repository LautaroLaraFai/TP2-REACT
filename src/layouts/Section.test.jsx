import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Section from "./Section";

describe("Section component", () => {
  it("Should render title when provided", () => {
    render(<Section title="Popular Games">Content</Section>);
    expect(screen.getByText("Popular Games")).toBeInTheDocument();
  });

  it("Should not render title when not provided", () => {
    render(<Section>Content</Section>);
    const title = screen.queryByRole("heading");
    expect(title).not.toBeInTheDocument();
  });

  it("Should render children content", () => {
    render(
      <Section title="Test">
        <div data-testid="child-content">Child Component</div>
      </Section>
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });
});