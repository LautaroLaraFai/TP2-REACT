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
      className={`w-10 h-10 p-0 bg-transparent border-none outline-none cursor-pointer ${extraStyles}`}
    >
      <div className="px-wrap-sm w-full h-full">
        <div className="px-border-sm bg-a-amber -inset-0.5" />
        <div className="px-inner-sm p-0.5 w-full h-full flex items-center justify-center bg-a-amber hover:bg-a-darkamber active:bg-a-lime transition-[background-color] duration-0">
          <img src={isAdded ? BrokenHeartIcon : HeartIcon} />
        </div>
      </div>
    </button>
  );
}