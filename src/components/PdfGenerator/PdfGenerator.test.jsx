import { beforeEach, describe, expect, it, vi } from "vitest"
import { PDFDownloadButton } from "./PdfGenerator";
import { render, screen } from "@testing-library/react";
import i18n from "../../i18n";

const testGame =   
    {
        "id": "1",
        "Name": "Grand Theft Auto V",
        "Rating": 4,
        "Image": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
        "ReleaseDate": "2013-09-17",
        "Genres": [
            "Action"
        ],
        "Developer": "Rockstar North",
        "Description": "Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.\n\n",
        "Screenshots": [
            "https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg",
            "https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg",
            "https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg",
            "https://media.rawg.io/media/screenshots/eb0/eb0a2c0de9194a635fc0cd04f5a29ae7.jpg",
            "https://media.rawg.io/media/screenshots/ec7/ec7f05fb82290fea9647b7879fe9a6bf.jpg"
        ],
        "Price": "17.99"
    }

let mockLoading = false

beforeEach(() => {
    i18n.changeLanguage('es')
    vi.clearAllMocks()
    mockLoading = false
})

// Esto es un mockeo del modulo, sirve para utilizar una version personalizada que se defina
vi.mock(import("@react-pdf/renderer"), async (importOriginal) => {
    const actual = await importOriginal()   // Esto se usa para que no tire problemas los estilos
    return {
        ...actual,  
        PDFDownloadLink: ({ children }) => children({ loading: mockLoading })
    }
})

describe('PdfGenerator component', () => {
    it('renders correctly', () => {
        render( <PDFDownloadButton game={testGame}/> )

        const button = screen.getByText('Descargar PDF')
        expect(button).toBeInTheDocument();
    })

    it('Should not render if game is null', () => {
        render(<PDFDownloadButton game={null} />);
        expect(screen.queryByText('Descargar PDF')).not.toBeInTheDocument();
    });

    it('Show text if file is not loaded yet', () => {
    
        mockLoading = true
        render(<PDFDownloadButton game={testGame} />);

        expect(screen.getByText('Generando...')).toBeInTheDocument();
    });
})