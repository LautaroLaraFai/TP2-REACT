import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";

export default function GameCardS({
  name,
  price,
  image = "",
  storeUrl = "",
  onClick,       
  isFavorite,    
  gameId,
  disableSearch
  }){
    
  const handleFavoriteClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick(); 
  };



  return (
    <div className="px-wrap-md group relative cursor-pointer">
      <div className="px-border-md bg-a-amber md:-inset-0.75 max-md:-inset-0.5" />
      <div className="px-inner-md flex flex-col overflow-hidden">
      <Link 
        to={`/detail/${gameId}`} 
        className="block"
        onClick={disableSearch}>
        <img
          href={storeUrl}
          src={image}
          className="w-full object-cover aspect-video"
        />
      </Link>
        {FavoriteButton && (
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
        )}
        <div className="bg-p-bg px-3 py-2 flex items-center cursor-auto">
          <div className="px-wrap-sm relative shrink-0">
            <div className="px-border-sm bg-a-lime -inset-0.5" />
            <div
              className="
                px-inner-sm
                text-nowrap lg:px-8 md:px-4 sm:px-2 max-sm:px-2 md:py-1 max-md:py-0.5
                lg:text-[1.2em] md:text-[1em] sm:text-[.9em] max-sm:text-[.8em]
                bg-a-lime text-p-bg
                transition-[filter] duration-200 group-hover:brightness-150
                max-md:leading-none
              "
            >
              USD$ {price}
            </div>
          </div>
          <span
            className="
              truncate min-w-0 md:ml-5 md:w-3/4 sm:ml-3 max-sm:ml-2 
              text-a-amber text-[1.2em] md:text-[1.2em] sm:text-[1em] 
              max-sm:text-[.8em]
            "
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}