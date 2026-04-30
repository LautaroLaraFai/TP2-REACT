import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router"
import MainLayout from "../../layouts/MainLayout"
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton"
import { useGamesByID } from "../../services/globals"

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
            <div className="min-h-screen bg-neutral-900" style={{ color: '#E7E8C6' }}>
                <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        
                        <div className="space-y-4">
                            <div className="relative bg-neutral-800 rounded-xl overflow-hidden">
                                {images.length > 0 && (
                                    <img 
                                        key={currentImage}
                                        className="w-full h-auto object-cover transition-all duration-500 ease-in-out" 
                                        src={images[currentImage]} 
                                        alt={game?.Name}
                                    />
                                )}
                                
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
                                        
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImage(index)}
                                                    className={`transition-all duration-300 ${
                                                        index === currentImage 
                                                            ? 'w-8 h-1 bg-(--color-a-amber) rounded' 
                                                            : 'w-4 h-1 bg-white/50 rounded hover:bg-white/75'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-3 items-center">
                                <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
                                    {images.length > 1 && images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                                index === currentImage 
                                                    ? 'border-(--color-a-amber) opacity-100' 
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                                
                                <div className="flex-shrink-0 flex items-center">
                                    <FavoriteButton  
                                        isAdded={favorites.includes(Number(id))}
                                        onClick={toggleFavorite}
                                        extraStyles="w-12 h-12 cursor-pointer transition-all duration-300 hover:scale-110"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="bg-neutral-800/50 rounded-xl p-8 backdrop-blur-sm h-full">
                                <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: 'var(--color-a-amber)' }}>
                                    {game?.Name}
                                </h1>
                                
                                <div className="space-y-8">
                                    <div className="border-b border-neutral-700 pb-6">
                                        <div className="text-base text-neutral-400 mb-2 uppercase tracking-wide">{t("detail.gameInfo.price")}</div>
                                        <div className="text-5xl font-bold" style={{ color: '#5AB65A' }}>
                                            ${game?.Price}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <div className="text-base text-neutral-400 uppercase tracking-wide">{t("detail.gameInfo.developer")}</div>
                                            <div className="text-2xl font-medium" style={{ color: 'var(--color-a-amber)' }}>
                                                {game?.Developer}
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="text-base text-neutral-400 uppercase tracking-wide">{t("detail.gameInfo.releaseDate")}</div>
                                            <div className="text-2xl font-medium" style={{ color: 'var(--color-a-amber)' }}>
                                                {game?.ReleaseDate}
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="text-base text-neutral-400 uppercase tracking-wide">{t("detail.gameInfo.rating")}</div>
                                            <div className="text-2xl" style={{ color: 'var(--color-a-amber)' }}>
                                                {renderStars(game?.Rating)}
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="text-base text-neutral-400 uppercase tracking-wide">{t("detail.gameInfo.genres")}</div>
                                            <div className="text-xl flex flex-wrap gap-2" style={{ color: 'var(--color-a-amber)' }}>
                                                {game?.Genres?.map((genre, i) => (
                                                    <span key={i}>
                                                        {genre}
                                                        {i < game.Genres.length - 1 && ","}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="bg-neutral-800/30 rounded-xl p-8 border border-neutral-700/50">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-a-amber)' }}>
                                {t("detail.gameInfo.description")}
                            </h2>
                            <div className="text-base md:text-lg leading-relaxed text-neutral-300 whitespace-pre-wrap break-words">
                                {game?.Description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Detail