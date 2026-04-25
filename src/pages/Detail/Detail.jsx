import { useState, useEffect } from "react"
import likeIcon from "../../assets/like-icon.svg"
import { getDataByID } from "../../services/getDataByID"

const Detail = () => {

    const [game, setGame] = useState(null)

    useEffect(() =>{
        const fetchData = async () =>{
            const gameId = "1"
            const gameData = await getDataByID(gameId)
             console.log("DATOS RECIBIDOS:", gameData)
            setGame(gameData)
        }

        fetchData()
    }, [])


    const images = [
        game?.Image,
        game?.Screenshots?.[0],
        game?.Screenshots?.[1],
    ]
  
    const [currentImage, setCurrentImage] = useState(0)

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

  return (
    <div style={{ color: '#E7E8C6' }}>
      <div className="flex items-center h-screen bg-neutral-800 p-25 rounded">
        {/* Carousel */}
        <div className="relative justify-center items-center !w-170 p-10">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              key={currentImage}
              className="w-full h-100 object-cover transition-all duration-500 ease-in-out animate-fadeIn" 
              src={images[currentImage]} 
              alt="Product"
            />
          </div>
          
          {/* Boton izquierdo */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Boton derecho */}
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicadores */}
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

          {/* Icono */}
          <img 
            className="absolute top-1 left-1 transition-all duration-300 hover:scale-120 hover:brightness-100" 
            src={likeIcon} 
            alt="Like" 
          />
        </div>
        
        <div className="flex flex-col h-100 w-100 gap-10">
          <h1 className="text-4xl">{game?.Name}</h1>
          <div className="flex flex-col items-start justify-center h-full w-full gap-10 text-lg">
            <p>Precio: <span style={{ color: '#5AB65A' }}>${game?.Price}</span></p>
            <p>Desarrollador: <span style={{ color: '#2A7FFF' }}>{game?.Developer}</span></p>
            <p>Fecha de lanzamiento: <span style={{ color: '#FFE066' }}>{game?.ReleaseDate}</span></p>
            <p>Rating: <span style={{ color: '#F48FB1' }}>{renderStars(game?.Rating)}</span></p>
            <p>Géneros: <span style={{ color: '#4DD0E1' }}>{game?.Genres?.join(", ")}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail