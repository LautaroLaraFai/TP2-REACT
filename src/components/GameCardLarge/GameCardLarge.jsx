import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation()
  return (
    <div className="px-wrap-md group">
      <div className="px-border-md bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
      <article
        className="
          px-inner-md
          relative overflow-hidden
          aspect-video w-full
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

        <div className="px-wrap-md-br absolute top-0 max-w-9/10 min-w-1/3 lg:max-w-5/9">
          <div className="px-border-md-br bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
          <div
            className="
              px-inner-md-br bg-p-bg md:pl-10 max-md:pl-4
              md:py-4 max-md:py-2 md:pr-4 max-md:pr-2
            "
          >
            <h2
              className="
                truncate w-full tracking-[.07em] mr-2 text-a-amber
                lg:text-[2em] md:text-[1.6em] sm:text-[1.2em] max-sm:text-[1em]
              "
            >
              {name}
            </h2>
            <p
              className="
                text-xs sm:text-sm md:text-xl leading-none line-clamp-3
                text-a-darkamber mb-2 mr-2
              "
            >
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

        <div
          className="
            px-wrap-rsm group absolute!
            lg:bottom-8 lg:right-6 md:bottom-6 md:right-4 max-md:bottom-3 max-md:right-1.5
          "
        >
          <div className="px-border-rsm bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
          <div
            className="
              px-inner-rsm flex items-stretch overflow-hidden
              lg:px-4 lg:py-2 md:px-3 md:py-1.5 max-md:px-2 max-md:py-1
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
                  lg:text-[1.6em] md:text-[1.2em] sm:text-[.8em] max-sm:text-[.6em]
                  bg-p-bg hover:bg-t-bg active:bg-s-neutral text-a-amber
                  lg:px-4 lg:py-2.5 md:px-3 md:py-2 max-md:px-2 max-md:py-1.2
                "
              >
                {t("home.gameCardLargeStore")}
                <img
                  src={gotoArrow}
                  alt=""
                  aria-hidden="true"
                  className="lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 max-sm:w-3 max-sm:h-3"
                />
              </div>
            </a>

            <div
              className="
                flex items-center text-p-bg text-nowrap
                lg:px-4 lg:py-2.5 md:px-3 md:py-2 max-md:px-2 max-md:py-1.2
                lg:text-[2em] md:text-[1.6em] sm:text-[1.2em] max-sm:text-[1em] tracking-[.02em]
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