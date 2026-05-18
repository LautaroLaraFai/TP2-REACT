import { beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "../../i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import LanguageOption from "./LanguageOption";
import userEvent from "@testing-library/user-event";


const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        clear: vi.fn(() => { store = {}; })
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
    localStorageMock.clear()
    i18n.changeLanguage('es');
    vi.clearAllMocks(); 
});

const mockedOnClose = vi.fn();

describe('LanguageOption component', () => {
    it('Should render the correct text option', () => {
        render(<LanguageOption content={"Español"} languagePrefix={"es"} onClose={mockedOnClose} />);
        expect(screen.getByText("Español")).toBeInTheDocument();
    });

    it('Should change language when clicked', async () => { 
        const user = userEvent.setup();
        const spy = vi.spyOn(i18n, 'changeLanguage')
        render(<LanguageOption content={"Español"} languagePrefix={"es"} onClose={mockedOnClose} />);

        const element = screen.getByText("Español");
        await user.click(element);  

        expect(spy).toHaveBeenCalledWith('es');  
    });

    it('Should have a diferent class when selected', async () => {
        const user = userEvent.setup();
        render(<LanguageOption content={"Español"} languagePrefix={"es"} onClose={mockedOnClose} />);

        const element = screen.getByText("Español");
        await user.click(element);    
        
        expect(element.className).toContain('bg-s-neutral border-l-4 border-orange-700')
    })

    it('Should save the selected language in localStorage', async () => {
        const user = userEvent.setup();
        const spy = vi.spyOn(i18n, 'changeLanguage')
        const currentLanguage = localStorageMock.getItem("language") || "es"
        expect(currentLanguage).toEqual("es")
        
        render(<LanguageOption content={"Lengua Negra"} languagePrefix={"mor"} onClose={mockedOnClose}/>);

        const element = screen.getByText("Lengua Negra");
        await user.click(element);  

        expect(spy).toHaveBeenCalledWith('mor');  

        const newLanguage = localStorageMock.getItem("language")
        expect(newLanguage).toEqual("mor")
    })
});