import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("Footer Component", () => {

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  };



  it("Correctly renders the team members' names", () => {
    renderComponent();

    expect(screen.getByText("Marcos Chavez")).toBeInTheDocument();
    expect(screen.getByText("Lautaro Lara")).toBeInTheDocument();
    expect(screen.getByText("Lucas Martinez")).toBeInTheDocument();
  });


  
  it("Correctly renders the Project Manager role", () => {
    renderComponent();

    expect(screen.getByText("Project Manager")).toBeInTheDocument();
  });



  it("Correctly renders the navigation links", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /footer.favText/i })).toBeInTheDocument();
  });



  it("Correctly renders the copyright", () => {
    renderComponent();

    expect(screen.getByText("footer.copyright")).toBeInTheDocument();
  });



  it("Correctly renders the profile images", () => {
    renderComponent();

    expect(screen.getByRole("img", { name: /Marcos Chavez/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Lautaro Lara/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Lucas Martinez/i })).toBeInTheDocument();
  });



  it("Correctly renders the external GitHub", () => {
    renderComponent();

    const githubLinks = screen.getAllByRole("link");

    expect(
      githubLinks.some((link) =>
        link.href.includes("Marcos-Chavez-5505")
      )
    ).toBe(true);

    expect(
      githubLinks.some((link) =>
        link.href.includes("LautaroLaraFai")
      )
    ).toBe(true);

    expect(
      githubLinks.some((link) =>
        link.href.includes("LucasLautaroMartinez")
      )
    ).toBe(true);
  });
});