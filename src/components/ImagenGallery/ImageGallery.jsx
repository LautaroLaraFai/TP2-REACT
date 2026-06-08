import { useState } from "react"
import leftArrow from "../../assets/left-arrow.svg"
import rightArrow from "../../assets/right-arrow.svg"

const ImageGallery = ({ game }) => {
    const [currentImage, setCurrentImage] = useState(0)

    // Adaptar las screenshots del formato del backend (array de objetos) a array de strings
    const screenshotUrls = game?.screenshots?.map(s => s.imageUrl) || []
    
    const images = [
        game?.Image,
        ...screenshotUrls
    ].filter(img => img)

    // Si no hay imagenes, no mostrar nada
    if (!images || images.length === 0) {
        return null
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const nextImage = () => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="space-y-4">
            {/* Imagen principal */}
            <div className="px-wrap-md">
                <div className="px-border-md bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
                <div className="px-inner-md relative bg-t-bg overflow-hidden h-87.5 md:h-100">
                    <img 
                        key={currentImage}
                        className="px-inner-md w-full h-full object-cover aspect-video" 
                        src={images[currentImage]} 
                        alt="Game screenshot"
                    />
                    
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

            {/* Miniaturas */}
            {images.length > 1 && (
                <div className="flex gap-3 items-center w-full">
                    <div className="flex gap-2 overflow-x-auto px-1 py-2 min-w-0 flex-1">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`px-wrap-sm shrink-0 w-20 h-20`}
                            >
                                <div className={`px-border-sm -inset-0.5 ${
                                    index === currentImage 
                                        ? 'bg-orange-700' 
                                        : 'bg-a-amber'
                                    }`}
                                />
                                <div className="px-inner-sm w-full h-full">
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover cursor-pointer" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageGallery