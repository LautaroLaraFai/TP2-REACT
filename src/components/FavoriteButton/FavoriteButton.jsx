import HeartIcon from "../../assets/heart-pixel.svg";
import BrokenHeartIcon from "../../assets/broken-heart-pixel.svg";

export default function FavoriteButton({
  onClick,
  isAdded = false, /* Si se agregó a favoritos, recibe true */
  extraStyles = "",
  iconClassName = "",
}) {
  const baseClass = `
    flex items-center justify-center
    w-10 h-10
    p-1
    rounded-xl
    bg-(--color-a-amber)
    transition-[filter] duration-0
    hover:bg-(--color-a-darkamber)
    active:bg-(--color-a-lime)
    cursor-pointer
    border-none
    outline-none
  `;

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${extraStyles}`}
    >
      <img 
        src={isAdded ? BrokenHeartIcon : HeartIcon} 
      />
    </button>
  );
}