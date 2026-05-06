import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router"
import MainLayout from "../../layouts/MainLayout"
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton"
import { useGamesByID } from "../../services/globals"
import { PDFDownloadButton } from "../../components/PdfGenerator/PdfGenerator.jsx"
import SpanInfo from "../../components/SpanInfo/SpanInfo.jsx"
import ImageGallery from "../../components/ImagenGallery/ImagenGallery.jsx"
import RatingStars from "../../components/RatingStars/RatingStars.jsx"
import useFavorite from "../../hooks/useFavorite.jsx"

const Detail = () => {
  const { t } = useTranslation();
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, isFavorite, toggleFavorite } = useFavorite()
  
    const game = useGamesByID(id)

    useEffect(() => {
        const gameId = Number(id);
        const isValidId = id && !isNaN(gameId) && gameId > 0 && gameId <= 54;
        
        if (!isValidId) {
            navigate('/error');
        }
    }, [id, navigate])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-neutral-800">
            <div className="text-a-amber text-2xl">{t("detail.loadingText")}</div>
            </div>
        )
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:px-4 md:px-8 max-md:px-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        <ImageGallery game={game} />
              
        {/* Información */}
        <div className="px-wrap-md">
          <div className="px-border-md bg-a-amber -inset-0.5"/>
          <div className="px-inner-md bg-t-bg p-8 backdrop-blur-sm h-full">
            <h1 className="text-5xl md:text-6xl mb-4 w-fit mx-auto text-left">
              {game?.Name}
            </h1>
            <div className="border-t-2 border-a-amber w-full mx-auto mb-6"/>
            
            <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 w-fit mx-auto py-4 text-a-amber">
                <SpanInfo label={t("detail.gameInfo.price")} textColor={"text-white"} data={`$${game?.Price}`}/>
                <SpanInfo label={t("detail.gameInfo.developer")} textColor={"text-a-darkamber"} data={game?.Developer}/>
                <SpanInfo label={t("detail.gameInfo.releaseDate")} textColor={"text-a-darkamber"} data={game?.ReleaseDate}/>
                <SpanInfo label={t("detail.gameInfo.rating")} textColor={"text-orange-700"} data={<RatingStars rating={game?.Rating} size="text-3xl" />}/>
                <SpanInfo label={t("detail.gameInfo.genres")} textColor={"text-a-darkamber"} data={game?.Genres?.join(", ")}/>
            </div>

            <div className="shrink-0 flex items-center gap-3 mt-5 justify-between lg:px-4 md:px-3 sm:px-2 max-sm:px-1">
              <FavoriteButton  
                isAdded={isFavorite(id)}
                onClick={toggleFavorite ? () => toggleFavorite(game.id) : undefined}
                extraStyles="lg:scale-110 md:scale-100 max-md:scale-90 cursor-pointer"
              />
              <PDFDownloadButton game={game} />
            </div>

          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="px-wrap-md mb-10 lg:mt-10 md:mt-8 max-md:mt-4">
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
  )
}

export default Detail