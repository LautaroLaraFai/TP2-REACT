import { useState } from "react"
import likeIcon from "../../assets/like-icon.svg"

const Detail = () => {
  const images = [
    "https://static0.cbrimages.com/wordpress/wp-content/uploads/2022/11/makima.jpg?w=1200&h=675&fit=crop",
    "https://tierragamer.com/wp-content/uploads/2022/12/Makimatierragamer-1.jpg",
    "https://www.japanfm.fr/wp-content/uploads/2022/10/Makima-Chainsaw-Man-scaled.webp"
  ]
  
  const [currentImage, setCurrentImage] = useState(0)

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div style={{ color: '#E7E8C6' }}>
      <div className="flex items-center h-screen bg-neutral-800 p-20">
        {/* Carousel */}
        <div className="relative flex justify-center items-center w-180 p-10">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              key={currentImage}
              className="w-full h-100 object-cover transition-all duration-500 ease-in-out animate-fadeIn" 
              src={images[currentImage]} 
              alt="Product"
            />
          </div>
          
          {/* Left button */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Right button */}
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicators */}
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

          {/* Floating icon */}
          <img className="absolute top-1 left-1" src={likeIcon} alt="Like" />
        </div>
        
        {/* Product information */}
        <div className="flex flex-col items-center h-100 w-100">
          <h1 className="text-4xl">Product Name</h1>
          <div className="flex flex-col justify-center h-full w-full gap-10 text-lg">
            <p style={{ color: '#5AB65A' }}>lorem</p>
            <p style={{ color: '#2A7FFF' }}>lorem</p>
            <p style={{ color: '#FFE066' }}>lorem</p>
            <p style={{ color: '#E7E8C6' }}>★★☆☆☆</p>
            <p style={{ color: '#4DD0E1' }}>lorem</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail