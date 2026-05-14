import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "./Header.jsx";
import i18n from "../../i18n.js";

const props = {
    clearInput: false,
    setClearInput: vi.fn(),  
    setSearchActive: vi.fn(),
    setFilteredGames: vi.fn(),
    setIsLoading: vi.fn()
}

beforeEach(() => {
  render(
    <BrowserRouter>
        <Header {...props} />
    </BrowserRouter>
  );

  i18n.changeLanguage("es")
})

describe('Header component', () => {
    it('Renders correctly', () => {
        const header = document.querySelector('header');
        expect(header).toBeInTheDocument();
    });
});

// Puede ser que añada tests para verificar que se puede navegar a home 
// y a favorites pero cuando se me olvide como lo hizo la IA