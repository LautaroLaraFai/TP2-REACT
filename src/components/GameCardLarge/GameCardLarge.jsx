import gotoArrow from "../../assets/goto-arrow-inverted-color.svg";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";


export default function GameCardLarge({
  name,
  description,
  price,
  image = "",
  storeUrl = "",
  onClick
}) {

  return (
    <article
      className="
        relative overflow-hidden
        aspect-video w-full
        border-3 border-(--color-a-amber)
        rounded-tr-2xl rounded-tl-0 rounded-br-2xl rounded-bl-2xl
        group
      "
    >
      <img
        src={image}
        alt={name}
        className="
          absolute inset-0 w-full h-full object-cover

          transition-transform duration-700 ease-out
          group-hover:scale-105
        "
      />

      <div className="absolute top-0 border-(--color-a-amber) bg-(--color-p-bg) max-w-9/10 min-w-1/3 lg:max-w-5/9 rounded-br-xl">
        <div className=" border-b-2 border-r-2 border-(--color-a-amber) rounded-br-xl md:pl-10 max-md:pl-4 md:py-4 max-md:py-2">
          <h2 className="truncate w-full lg:text-[2em] md:text-[1.6em] sm:text-[1.2em] max-sm:text-[1em] tracking-[.07em] text-(--color-a-amber) mr-2">
            {name}
          </h2>
          <p className="text-xs sm:text-sm md:text-xl leading-none line-clamp-3 text-(--color-a-darkamber) mb-2 mr-2">
            {description}
          </p>
        </div>
      </div>

      <FavoriteButton
        onClick={onClick}
        extraStyles={`
          absolute
          lg:top-8 lg:right-8 lg:scale-150
          md:top-3 md:right-3 md:scale-110
          sm:top-2 sm:right-2 sm:scale-100
          max-sm:top-0 max-sm:right-0 max-sm:scale-60
        `}
      />
      
      {/* gradiente oscuro */}
      {/* <div
        className="
          absolute inset-0
          bg-linear-to-t from-black/80 via-transparent to-transparent
          pointer-events-none
        "
      /> */}

      <div
        className="
          absolute lg:bottom-8 lg:right-6 md:bottom-6 md:right-4 max-md:bottom-3 max-md:right-1.5
          flex items-stretch
          rounded-xl overflow-hidden
          
          border-2 border-(--color-a-amber)
          bg-(--color-a-amber)
          lg:px-4 lg:py-2 md:px-3 md:py-1.5 max-md:px-2 max-md:py-1
        "
      >
        <a
          href={storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2
            bg-(--color-p-bg) hover:bg-(--color-t-bg) active:bg-(--color-s-neutral)
            text-(--color-a-amber) rounded-xl
            lg:text-[1.6em] md:text-[1.2em] sm:text-[.8em] max-sm:text-[.6em] tracking-[.02em]
            lg:px-4 lg:py-2.5 md:px-3 md:py-2 max-md:px-2 max-md:py-1.2
            select-none
          "
        >
          Visitar Tienda
          <img
            src={gotoArrow}
            alt=""
            aria-hidden="true"
            className="lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 max-sm:w-3 max-sm:h-3"
          />
        </a>

        <div
          className="
            flex items-center
            text-(--color-p-bg)
            lg:px-4 lg:py-2.5 md:px-3 md:py-2 max-md:px-2 max-md:py-1.2
            lg:text-[2em] md:text-[1.6em] sm:text-[1.2em] max-sm:text-[1em] tracking-[.02em]
            md:ml-2 sm:ml-1 max-sm:ml-0.8
            text-nowrap
          "
        >
          USD$ {price}
        </div>
      </div>
    </article>
  );
}