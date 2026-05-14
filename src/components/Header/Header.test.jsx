import { render } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";  // 👈 importá tu configuración
import Header from "./Header.jsx"

const props = {
    clearInput: false,
    setClearInput: () => {},  
    setSearchActive: () => {},
    setFilteredGames: () => {},
    setIsLoading: () => {}
}

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>  {/* 👈 usás tu i18n ya configurado */}
        {component}
      </I18nextProvider>
    </BrowserRouter>
  );
};

describe('Header component', () => {
    beforeEach(() => {
        renderWithProviders(<Header {...props} />);
    });

    it('Renders correctly', () => {
        const header = document.querySelector('header');
        expect(header).toBeInTheDocument();
    });
    
    it('Is not empty', () => {
        const header = document.querySelector('header');
        expect(header).not.toBeEmptyDOMElement();
    });
});

//! INVESTIGAR QUE CARAJOS SON LOS PROVIDERS Y VER SI SE PUEDEN GLOBALIZAR