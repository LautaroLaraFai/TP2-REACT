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



  it("Renderiza correctamente los nombres del equipo", () => {
    renderComponent();

    expect(screen.getByText("Marcos Chavez")).toBeInTheDocument();

    expect(screen.getByText("Lautaro Lara")).toBeInTheDocument();

    expect(screen.getByText("Lucas Martinez")).toBeInTheDocument();
  });


  
  it("Renderiza correctamente el rol Project Manager", () => {
    renderComponent();

    expect(screen.getByText("Project Manager")).toBeInTheDocument();
  });



  it("Renderiza correctamente los links de navegación", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /footer.favText/i })).toBeInTheDocument();
  });



  it("Renderiza correctamente el copyright", () => {
    renderComponent();

    expect(screen.getByText("footer.copyright")).toBeInTheDocument();
  });



  it("Renderiza correctamente las imágenes de perfil", () => {
    renderComponent();

    expect(screen.getByRole("img", { name: /Marcos Chavez/i })).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /Lautaro Lara/i })).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /Lucas Martinez/i })).toBeInTheDocument();
  });



  it("Renderiza correctamente los links externos de GitHub", () => {
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