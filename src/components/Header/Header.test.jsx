import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
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
    i18n.changeLanguage("es");
    vi.clearAllMocks();
});

describe('Header component', () => {

    it('Renders correctly', () => {
        render(
            <MemoryRouter>
                <Header {...props} />
            </MemoryRouter>
        );
        
        const header = document.querySelector('header');
        expect(header).toBeInTheDocument();
    });

    it('Should navigate to favorite when clicking on favorite', async () => {
        const user = userEvent.setup();
        
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Header {...props} />} />
                    <Route path="/favorite" element={<div data-testid="favorite-page"> Favoritos </div>} />
                </Routes>
            </MemoryRouter>
        );
        
        const trigger = screen.getByText("Favoritos");
        await user.click(trigger);
        
        expect(screen.getByTestId("favorite-page")).toBeInTheDocument();
    });

    it('Should navigate to home when clicking on the logo', async () => {
        const user = userEvent.setup();
        
        render(
            <MemoryRouter initialEntries={["/favorite"]}>
                <Routes>
                    <Route path="/" element={<div data-testid="home-page"> ESTOY EN HOME </div>} />
                    <Route path="/favorite" element={<Header {...props} />} />
                </Routes>
            </MemoryRouter>
        );
        
        const trigger = screen.getByLabelText("to home");
        await user.click(trigger);
        
        expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
});