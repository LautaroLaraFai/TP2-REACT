import { render, screen } from "@testing-library/react"
import { describe, it } from "vitest"
import Loader from "./Loader"

describe("Loader Component", () => {

  it("Renderiza correctamente el spinner", () => {
    const { container } = render(<Loader/>);
    const element = container.firstChild;
  
    expect(element).toBeInTheDocument();
  });

});