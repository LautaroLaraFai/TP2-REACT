import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";

export default function GameCardMedium({
  name,
  price,
  genres = [],
  image = "",
  releaseDate,
  onClick,
  isFavorite,
  gameId,
}) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <div className="px-wrap-sm group relative lg:w-200 lg:mx-auto md:mx-12 sm:mx-8 max-sm:mx-4">
      <div className="px-border-sm bg-a-amber -inset-0.5" />
      <div className="px-inner-sm flex flex-row overflow-hidden">

        <Link
          to={`/detail/${gameId}`}
          className="block shrink-0 w-[clamp(70px,18%,180px)] border-r-3 border-a-amber"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover aspect-video"
          />
        </Link>

        <div className="
          bg-p-bg flex flex-1 items-center min-w-0
          px-2 py-2 gap-1 sm:gap-2 md:gap-3 overflow-hidden
        ">

          <div className="
            flex flex-col justify-center gap-1 sm:gap-2 md:gap-4
            flex-1 min-w-0
            mt-2 ml-1 sm:ml-2 md:ml-4
          ">
            <span className="
              truncate text-a-amber
              text-sm sm:text-xl md:text-2xl lg:text-3xl leading-tight
            ">
              {name}
            </span>
            <span className="
              truncate text-a-darkamber font-medium tracking-wide
              text-xs sm:text-base md:text-lg lg:text-xl leading-tight
            ">
              {genres?.join(", ")}
            </span>
          </div>

          <div className="
            flex flex-col items-end shrink-0
            mt-2 mr-0 sm:mr-2 md:mr-6 min-w-0
          ">
            <span className="
              text-white font-semibold
              text-xs sm:text-base md:text-xl lg:text-2xl
              whitespace-nowrap
            ">
              USD$ {price}
            </span>
            {releaseDate && (
              <span className="
                text-a-darkamber font-semibold tracking-widest uppercase
                text-[10px] sm:text-sm md:text-base leading-tight
                whitespace-nowrap
              ">
                {releaseDate}
              </span>
            )}
          </div>

          {FavoriteButton && (
            <FavoriteButton
              isAdded={isFavorite}
              onClick={handleFavoriteClick}
              extraStyles={`
                shrink-0
                scale-60 sm:scale-80 md:scale-90 lg:scale-110
                mr-0 sm:mr-1 md:mr-4
                z-20
              `}
            />
          )}
        </div>
      </div>
    </div>
  );
}