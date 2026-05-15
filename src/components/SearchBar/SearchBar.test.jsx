import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetch from "../../services/getDataByFilter"

beforeEach(() => {
    vi.clearAllMocks();
});

vi.mock("../../services/getDataByFilter", () => ({
    default: vi.fn()
}));

const props = {
    clearInput: vi.fn(),
    setClearInput: vi.fn(),
    setSearchActive: vi.fn(),
    setFilteredGames: vi.fn(),
    setIsLoading: vi.fn()
}

describe('SearchBar component', () => {
    it('Should render correctly', () => {
        render( <SearchBar {...props} /> )
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('Should allow writing', async () => {
        const user = userEvent.setup();
        render( <SearchBar {...props} /> )
        
        const input = screen.getByRole('textbox')
        await user.type(input, 'Outer Wilds')

        expect(input).toHaveValue('Outer Wilds')
    })

    it('Should search the game with the value on the input', async () => {
        const user = userEvent.setup();
        render( <SearchBar {...props} /> )
        
        const input = screen.getByRole('textbox')
        await user.type(input, 'Outer Wilds{enter}')  

        expect(fetch).toHaveBeenCalledWith('Name', 'Outer Wilds')
    })

    it('Should search by Developer', async () => {
        const user = userEvent.setup();
        render( <SearchBar {...props} /> )
        
        const input = screen.getByRole('textbox')
        await user.type(input, '@Rockstar{enter}')  

        expect(fetch).toHaveBeenCalledWith('Developer', 'Rockstar')
    })

    it('Should NOT search if input value is empty', async () => {
        const user = userEvent.setup();
        render( <SearchBar {...props} /> )
        
        const input = screen.getByRole('textbox')
        await user.type(input, '{enter}')
        
        expect(props.setClearInput).toHaveBeenCalledWith(false)
        expect(fetch).not.toHaveBeenCalled();
    })
})