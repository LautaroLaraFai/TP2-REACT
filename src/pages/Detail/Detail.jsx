import { useState, useEffect } from "react"
import { getDataByID } from "../../services/getDataByID"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"
import MainLayout from "../../layouts/MainLayout"
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton"
import { useGamesByID } from "../../services/globals"
import { PDFDownloadButton } from "../../components/PdfGenerator/PdfGenerator.jsx"

const Detail = () => {
    const { t } = useTranslation();
    const { id } = useParams()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)

    const game = useGamesByID(id)

    useEffect(() => {
        const initializeData = async () => {
            try {
                const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
                const favoritesAsNumbers = storedFavorites.map(fav => Number(fav))
                setFavorites(favoritesAsNumbers)
                setLoading(false)
            } catch (error) {
                console.error('Error:', error)
                setLoading(false)
            }
        }
        
        initializeData()

        const syncFavorites = () => {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
            const favoritesAsNumbers = storedFavorites.map(fav => Number(fav))
            setFavorites(favoritesAsNumbers)
        }

        window.addEventListener('storage', syncFavorites)
        window.addEventListener('focus', syncFavorites)
        
        return () => {
            window.removeEventListener('storage', syncFavorites)
            window.removeEventListener('focus', syncFavorites)
        }
    }, [id])

    const toggleFavorite = () => {
        const gameId = Number(id)
        const newFavorites = favorites.includes(gameId) 
            ? favorites.filter(fid => fid !== gameId)
            : [...favorites, gameId]
        
        setFavorites(newFavorites)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        window.dispatchEvent(new Event('storage'))
    }

    const images = [
        game?.Image,
        game?.Screenshots?.[0],
        game?.Screenshots?.[1],
        game?.Screenshots?.[2],
        game?.Screenshots?.[3],
        game?.Screenshots?.[4],
    ].filter(img => img)

    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const nextImage = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const renderStars = (rating) => {
        if (!rating) return "☆☆☆☆☆"
        const fullStars = "★".repeat(rating)
        const emptyStars = "☆".repeat(5 - rating)
        return fullStars + emptyStars
    }

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-screen bg-neutral-800">
                    <div className="text-(--color-a-amber) text-2xl">{t("detail.loadingText")}</div>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div style={{ color: '#E7E8C6' }}>
                <div className="flex flex-col bg-neutral-800 p-25 rounded">
                    <div className="flex">
                        <div className="relative justify-center items-center w-170! p-10">
                            <div className="relative overflow-hidden rounded-lg">
                                {images.length > 0 && (
                                    <img 
                                        key={currentImage}
                                        className="w-full h-100 object-cover transition-all duration-500 ease-in-out animate-fadeIn" 
                                        src={images[currentImage]} 
                                        alt="Product"
                                    />
                                )}
                            </div>
                            
                            {images.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImage(index)}
                                                className={`transition-all duration-300 ${
                                                    index === currentImage 
                                                        ? 'w-8 h-1 bg-white rounded' 
                                                        : 'w-4 h-1 bg-white/50 rounded hover:bg-white/75'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            <FavoriteButton  
                                isAdded={favorites.includes(Number(id))}
                                onClick={toggleFavorite}
                                extraStyles="absolute w-20 h-20 top-2 left-2 w-10 h-10 cursor-pointer transition-all duration-300 hover:scale-110"
                            />
                        </div>
                        
                        <div className="flex flex-col w-100 gap-10 p-10">
                            <h1 className="text-4xl">{game?.Name}</h1>
                            <div className="flex flex-col gap-5 text-2xl">
                                <p>{t("detail.gameInfo.price")}: <span style={{ color: '#5AB65A' }}>${game?.Price}</span></p>
                                <p>{t("detail.gameInfo.developer")}: <span style={{ color: '#2A7FFF' }}>{game?.Developer}</span></p>
                                <p>{t("detail.gameInfo.releaseDate")}: <span style={{ color: '#FFE066' }}>{game?.ReleaseDate}</span></p>
                                <p>{t("detail.gameInfo.rating")}: <span style={{ color: '#F48FB1' }}>{renderStars(game?.Rating)}</span></p>
                                <p>{t("detail.gameInfo.genres")}: <span style={{ color: '#4DD0E1' }}>{game?.Genres?.join(", ")}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="px-10 pb-10 mt-5">
                        <div className="text-2xl w-full p-6 bg-neutral-700/30 border border-neutral-600 rounded-lg leading-relaxed whitespace-pre-wrap break-words">
                            <h2 
                                className="text-3xl font-medium mb-4">{t("detail.gameInfo.description")}
                            </h2>
                            {game?.Description}
                        </div>
                        {t("detail.downloadText")} {game !== null ? <PDFDownloadButton game={game} /> : ""}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Detail