import { beforeEach, describe, expect, it, vi } from "vitest";
import LanguageSwitcher from "./LanguageSwitcher";
import { render, screen } from "@testing-library/react";
import i18n from "../../i18n";

const mockedOnClose = vi.fn()

beforeEach(() => {
    i18n.changeLanguage('es')
})

describe('LanguageSwitcher component', () => {
    it('Should render correctly', () => {
        render( <LanguageSwitcher onClose={mockedOnClose} /> )

        expect(screen.getByText('Español')).toBeInTheDocument()
        expect(screen.getByText('Inglés')).toBeInTheDocument()
        expect(screen.getByText('Lengua Negra')).toBeInTheDocument()
    })
})