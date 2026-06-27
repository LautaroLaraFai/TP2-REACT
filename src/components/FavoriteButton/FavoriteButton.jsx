import HeartIcon from "../../assets/heart-pixel.svg";
import BrokenHeartIcon from "../../assets/broken-heart-pixel.svg";
import { useFavorites } from "../../context/FavoriteContext";

export default function FavoriteButton({
  gameId,
  extraStyles = ""
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isAdded = isFavorite(gameId);

  return (
    <button
      onClick={() => toggleFavorite(gameId)}
      className={`w-10 h-10 p-0 bg-transparent border-none outline-none cursor-pointer ${extraStyles}`}
      type="button"
    >
      <div className="px-wrap-sm w-full h-full">
        <div className="px-border-sm bg-a-amber -inset-0.5" />
        <div
          className="
            px-inner-sm p-0.5 w-full h-full flex items-center
            justify-center bg-a-amber hover:bg-a-darkamber
            active:bg-a-lime transition-[background-color]
            duration-0
          "
        >
          <img src={isAdded ? BrokenHeartIcon : HeartIcon} />
        </div>
      </div>
    </button>
  );
}