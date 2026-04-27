import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";

export default function GameCardS({
    name,
    price,
    image = "",
    storeUrl = "",
    onClick,       
    isFavorite,    
    gameId
}){

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
            if (onClick) onClick();
        }, 100);
    };

    return (
        <div className="group relative rounded-lg overflow-hidden border-2 border-(--color-a-amber) flex flex-col">
            
            {/* Link para navegar al detalle */}
            <Link to={`/detail/${gameId}`} className="block">
                <img
                    src={image}
                    className="w-full object-cover aspect-video"
                />

                <div className="bg-(--color-p-bg) px-3 py-2 flex items-center">
                    <div className="text-nowrap lg:px-8 md:px-4 sm:px-2 max-sm:px-1 md:py-1 max-md:py-0.5 lg:text-[1.2em] md:text-[1em] sm:text-[.9em] max-sm:text-[.8em] bg-(--color-a-lime) text-(--color-p-bg) transition-[filter] duration-200 group-hover:brightness-150 rounded-sm max-md:leading-none">
                        USD$ {price}
                    </div>
                    <span className="truncate min-w-0 md:ml-5 md:w-3/4 sm:ml-3 max-sm:ml-2 text-(--color-a-amber) text-[1.2em] md:text-[1.2em] sm:text-[1em] max-sm:text-[.8em]">{name}</span>
                </div>
            </Link>

            {/* Botón de favorito - Fuera del Link */}
            <FavoriteButton
                isAdded={isFavorite}  
                onClick={handleFavoriteClick}
                extraStyles={`
                    absolute top-2 right-2
                    translate-x-[150%] opacity-0
                    group-hover:translate-x-0 group-hover:opacity-100
                    transition-transform transition-opacity duration-[400ms] ease-in-out
                    lg:top-3 lg:right-3 lg:scale-120
                    md:top-2 md:right-2 md:scale-100
                    sm:top-1 sm:right-1 sm:scale-90
                    max-sm:top-1 max-sm:right-1 max-sm:scale-80
                    z-20
                `}
            />
        </div>
    );
}