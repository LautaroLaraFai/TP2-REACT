import { beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "../../i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import LanguageOption from "./LanguageOption";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
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
});