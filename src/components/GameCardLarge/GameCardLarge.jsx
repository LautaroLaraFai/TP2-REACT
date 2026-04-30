import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gotoArrow from "../../assets/goto-arrow-inverted-color.svg";
import FavoriteButton from "../FavoriteButton/FavoriteButton.jsx";

export default function GameCardLarge({
  name,
  description,
  price,
  image = "",
  storeUrl = "",
  onClick,       
  isFavorite,    
  gameId
}) {
  const { t } = useTranslation();
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(); 
  };

  return (
    <div className="px-wrap-md group lg:mx-20 md:mx-14 sm:mx-10 max-sm:mx-6 mt-12 mb-14 max-sm:mt-8 max-sm:mb-10">
      <div className="px-border-md bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
      <article
        className="
          px-inner-md
          relative overflow-hidden
          aspect-video w-full
        "
      >
        {/* ✅ Link envuelve la imagen */}
        <Link to={`/detail/${gameId}`} className="block absolute inset-0">
          <img
            src={image}
            alt={name}
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-105
            "
          />
        </Link>

        <div className="px-wrap-md-br absolute top-0 max-w-9/10 min-w-1/3 lg:max-w-5/9 z-10">
          <div className="px-border-md-br bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
          <div
            className="
              px-inner-md-br bg-p-bg md:pl-8 max-md:pl-3
              md:py-3 max-md:py-1.5 md:pr-3 max-md:pr-1.5
            "
          >
            <Link to={`/detail/${gameId}`}>
              <h2
                className="
                  truncate w-full tracking-[.07em] mr-2 text-a-amber hover:text-a-lime transition-colors
                  lg:text-[1.6em] md:text-[1.3em] sm:text-[1em] max-sm:text-[0.9em]
                "
              >
                {name}
              </h2>
            </Link>
            <p
              className="
                text-xs sm:text-sm md:text-base leading-tight line-clamp-2
                text-a-darkamber mb-1 mr-2
              "
            >
              {description}
            </p>
          </div>
        </div>

        <FavoriteButton
          isAdded={isFavorite}
          onClick={handleFavoriteClick}
          extraStyles={`
            absolute
            lg:top-6 lg:right-6 lg:scale-130
            md:top-2 md:right-2 md:scale-100
            sm:top-1.5 sm:right-1.5 sm:scale-90
            max-sm:top-0 max-sm:right-0 max-sm:scale-70
            z-20
          `}
        />

        <div
          className="
            px-wrap-rsm group absolute!
            lg:bottom-6 lg:right-5 md:bottom-4 md:right-3 max-md:bottom-2 max-md:right-1.5
            z-10
          "
        >
          <div className="px-border-rsm bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
          <div
            className="
              px-inner-rsm flex items-stretch overflow-hidden
              lg:px-3 lg:py-1.5 md:px-2.5 md:py-1 max-md:px-2 max-md:py-0.5
              bg-a-amber
            "
          >
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-wrap-sm group select-none group flex!"
            >
              <div className="px-border-sm bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
              <div
                className="
                  px-inner-sm flex items-center gap-2 tracking-[.02em]
                  lg:text-[1.3em] md:text-[1em] sm:text-[0.7em] max-sm:text-[0.55em]
                  bg-p-bg hover:bg-t-bg active:bg-s-neutral text-a-amber
                  lg:px-3 lg:py-2 md:px-2.5 md:py-1.5 max-md:px-2 max-md:py-1
                "
              >
                {t("home.gameCardLargeStore")}
                <img
                  src={gotoArrow}
                  alt=""
                  aria-hidden="true"
                  className="lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3 max-sm:w-2.5 max-sm:h-2.5"
                />
              </div>
            </a>

            <div
              className="
                flex items-center text-p-bg text-nowrap
                lg:px-3 lg:py-2 md:px-2.5 md:py-1.5 max-md:px-2 max-md:py-1
                lg:text-[1.6em] md:text-[1.3em] sm:text-[1em] max-sm:text-[0.85em] tracking-[.02em]
                md:ml-2 sm:ml-1 max-sm:ml-0.8
              "
            >
              USD$ {price}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}