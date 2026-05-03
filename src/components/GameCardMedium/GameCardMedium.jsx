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
    <div className="px-wrap-sm group relative lg:mx-16 md:mx-12 sm:mx-8 max-sm:mx-4">
      <div className="px-border-sm bg-a-amber -inset-0.5" />
      <div className="px-inner-sm flex flex-row overflow-hidden">
        <Link
          to={`/detail/${gameId}`}
          className="block shrink-0 w-[clamp(100px,20%,180px)] border-r-3 border-a-amber"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover aspect-video"
          />
        </Link>

        <div className="bg-p-bg flex flex-1 items-center px-3 py-2 gap-3 min-w-0">
          <div className="flex flex-col justify-center gap-4 flex-1 min-w-0 mt-2 ml-4">
            <span
              className="
              truncate text-a-amber
              lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg leading-4.5
              "
              >
              {name}
            </span>
            <span
              className="
              truncate text-a-darkamber
              font-medium tracking-wide
              lg:text-xl md:text-lg sm:text-base max-sm:text-sm leading-4.5
              "
              >
              {genres?.join(", ")}
            </span>
          </div>

          <div className="flex flex-col items-end gap-0 mt-4 shrink-0 md:mr-6 max-md:mr-0">
            <div
              className="
                text-nowrap
                lg:text-2xl md:text-xl sm:text-lg max-sm:text-base
                text-white
                "
                >
              USD$ {price}
            </div>
            {releaseDate && (
              <span
              className="
                text-a-darkamber
                font-semibold tracking-widest uppercase whitespace-nowrap
                lg:text-base md:text-base sm:text-sm max-sm:text-sm leading-4.5
              "
              >
                {releaseDate}
              </span>
            )}
          </div>

          {FavoriteButton && (
            <FavoriteButton
              isAdded={isFavorite}
              onClick={handleFavoriteClick}
              extraStyles={`
                md:mr-4 max-md:mr-0
                lg:scale-110 md:scale-90 sm:scale-80 max-sm:scale-70 z-20
              `}
            />
          )}

        </div>
      </div>
    </div>
  );
}