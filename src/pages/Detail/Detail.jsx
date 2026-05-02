import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router"
import MainLayout from "../../layouts/MainLayout"
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton"
import { useGamesByID } from "../../services/globals"
import { PDFDownloadButton } from "../../components/PdfGenerator/PdfGenerator.jsx"
import leftArrow from "../../assets/left-arrow.svg"
import rightArrow from "../../assets/right-arrow.svg"

const Detail = () => {
    const { t } = useTranslation();
    const { id } = useParams()
    const navigate = useNavigate()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)

    const game = useGamesByID(id)

    // Redireccionar si el id no existe o no esta dentro de la api
    useEffect(() => {
        const gameId = Number(id);
        const isValidId = id && !isNaN(gameId) && gameId > 0 && gameId <= 51;
        
        if (!isValidId) {
            navigate('/');
        }
    }, [id, navigate])


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
          <div className="text-a-amber text-2xl">{t("detail.loadingText")}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
    <div className="max-w-7xl mx-auto px-4 py-8 lg:px-4 md:px-8 max-md:px-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        <div className="space-y-4">
          
          {/* Imagen principal */}
          <div className="px-wrap-md">
            <div className="px-border-md bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
            <div className="px-inner-md relative bg-t-bg overflow-hidden h-87.5 md:h-100">
              {images.length > 0 && (
                <img 
                  key={currentImage}
                  className="px-inner-md w-full h-full object-cover aspect-video" 
                  src={images[currentImage]} 
                  alt={game?.Name}
                />
              )}
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="px-wrap-sm absolute! left-4 top-1/2 -translate-y-1/2 text-a-amber cursor-pointer"
                  >
                    <div className="px-border-sm bg-a-amber -inset-0.5"/>
                    <img src={leftArrow} className="px-inner-sm bg-p-bg p-1.5 w-10 h-10 hover:bg-p-bg/75 active:bg-t-bg pr-3"/>
                  </button>

                  <button
                    onClick={nextImage}
                    className="px-wrap-sm absolute! right-4 top-1/2 -translate-y-1/2 text-a-amber cursor-pointer"
                  >
                    <div className="px-border-sm bg-a-amber md:-inset-0.5 max-md:-inset-0.5"/>
                    <img src={rightArrow} className="px-inner-sm bg-p-bg p-1.5 w-10 h-10 hover:bg-p-bg/75 active:bg-t-bg pl-3"/>
                  </button>

                        
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`transition-all duration-300 cursor-pointer ${
                          index === currentImage 
                            ? 'w-8 h-1 bg-a-amber' 
                            : 'w-4 h-1 bg-a-darkamber hover:bg-a-amber/75'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Contenedor imágenes pequeñas y botones favorito y PDF */}
          <div className="flex gap-3 items-center w-full">
            {/* Imágenes */}
            <div className="flex gap-2 overflow-x-auto px-1 py-2 min-w-0 flex-1">
              {images.length > 1 && images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`px-wrap-sm shrink-0 w-20 h-20`}
                >
                  <div className={`px-border-sm -inset-0.5 ${
                      index === currentImage 
                        ? 'bg-orange-700' 
                        : 'bg-a-amber'
                      }`
                    }
                  />
                  <div className="px-inner-sm w-full h-full">
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover cursor-pointer" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
              
        {/* Información */}
        <div className="px-wrap-md">
          <div className="px-border-md bg-a-amber -inset-0.5"/>
          <div className="px-inner-md bg-t-bg p-8 backdrop-blur-sm h-full">
            <h1 className="text-5xl md:text-6xl mb-4 w-fit mx-auto text-left">
              {game?.Name}
            </h1>
            <div className="border-t-2 border-a-amber w-full mx-auto mb-6"/>
            
            <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 w-fit mx-auto py-4 text-a-amber">
              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5">{t("detail.gameInfo.price")}</span>
              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5 text-white">${game?.Price}</span>

              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5">{t("detail.gameInfo.developer")}</span>
              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5 text-a-darkamber">{game?.Developer}</span>

              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5">{t("detail.gameInfo.releaseDate")}</span>
              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5 text-a-darkamber">{game?.ReleaseDate}</span>

              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5">{t("detail.gameInfo.rating")}</span>
              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5 text-orange-700">{renderStars(game?.Rating)}</span>

              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5">{t("detail.gameInfo.genres")}</span>
              <span className="lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5 lg:my-2.5 md:my-1.5 sm:my-0.5 text-a-darkamber">{game?.Genres?.join(", ")}</span>
            </div>

            <div className="shrink-0 flex items-center gap-3 mt-5 justify-between lg:px-4 md:px-3 sm:px-2 max-sm:px-1">
              <FavoriteButton  
                isAdded={favorites.includes(Number(id))}
                onClick={toggleFavorite}
                extraStyles="lg:scale-110 md:scale-100 max-md:scale-90 cursor-pointer"
              />
              <PDFDownloadButton game={game} />
            </div>

          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="px-wrap-md mb-10 lg:mt-10 md:mt-8 max-md:mt-4">
        {/* <div className="px-border-md bg-s-bg -inset-0.5"/> */}
        <div className="px-inner-md bg-p-bg p-8">
          <h2 className="text-2xl md:text-3xl mb-4">
            {t("detail.gameInfo.description")}
          </h2>
          <div className="lg:text-2xl md:text-1.5xl sm:text-xl max-sm:text-lg leading-5 text-a-darkamber whitespace-pre-wrap wrap-break-word">
            {game?.Description}
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  )
}

export default Detail