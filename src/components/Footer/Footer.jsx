import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import lautiPixelArt from "../../images/lautiPixelArt.png";
import lucasPixelArt from "../../images/lucasPixelArt.png";
import marcosPixelArt from "../../images/marcosPixelArt.png";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="px-wrap-lg-b">
      <div className="px-border-lg-b bg-p-bg md:-inset-0.75 max-md:-inset-0.5" />
      <div className="px-inner-lg-b bg-s-neutral flex flex-col items-center md:py-12 max-md:py-8 md:px-12 max-md:px-8">
        
        {/* Contenedor principal - 3 recuadros centrados */}
        <div className="flex flex-row justify-center items-start lg:gap-24 md:gap-16 sm:gap-12 max-sm:gap-6 w-full max-w-5xl mx-auto mb-8 md:mb-12">
          
          {/*Marcos*/}
          <div className="flex flex-col items-center lg:w-40 md:w-32 sm:w-28 max-sm:w-20">
            <div className="px-wrap-lg group w-full lg:h-40 md:h-32 sm:h-28 max-sm:h-20 aspect-square">
              <div className="px-border-lg group-hover:bg-a-darkamber group-active:bg-orange-700 transition-colors duration-200 md:-inset-0.75 max-md:-inset-0.5"/>
              <a href="https://github.com/Marcos-Chavez-5505" target="_blank">
                <img
                  src={marcosPixelArt}
                  alt="Marcos Chavez"
                  className="px-inner-lg w-full h-full object-cover"
                />
              </a>
            </div>
            <p className="md:mt-4 max-md:mt-3 text-center lg:text-xl md:text-lg sm:text-base max-sm:text-sm leading-4.5">
              Marcos Chavez
            </p>
          </div>

          {/* Lauti */}
          <div className="flex flex-col items-center lg:w-40 md:w-32 sm:w-28 max-sm:w-20">
            <div className="px-wrap-lg group w-full lg:h-40 md:h-32 sm:h-28 max-sm:h-20 aspect-square">
              <div className="px-border-lg group-hover:bg-a-darkamber group-active:bg-orange-700 transition-colors duration-200 md:-inset-0.75 max-md:-inset-0.5"/>
              <a href="https://github.com/LautaroLaraFai" target="_blank">
                <img
                  src={lautiPixelArt}
                  alt="Lautaro Lara"
                  className="px-inner-lg w-full h-full object-cover"
                />
              </a>
            </div>
            <div className="md:mt-4 max-md:mt-3 text-center">
              <p className="font-medium lg:text-xl md:text-lg sm:text-base max-sm:text-sm leading-4.5 lg:mb-4 md:mb-3 sm:mb-3 max-sm:mb-2">
                Lautaro Lara
              </p>
              <p className="text-a-darkamber font-bold lg:text-lg md:text-base sm:text-sm max-sm:text-sm uppercase tracking-wider leading-3.5">
                Project Manager
              </p>
            </div>
          </div>

          {/*Lucas*/}
          <div className="flex flex-col items-center lg:w-40 md:w-32 sm:w-28 max-sm:w-20">
            <div className="px-wrap-lg group w-full lg:h-40 md:h-32 sm:h-28 max-sm:h-20 aspect-square">
              <div className="px-border-lg group-hover:bg-a-darkamber group-active:bg-orange-700 transition-colors duration-200 md:-inset-0.75 max-md:-inset-0.5"/>
              <a href="https://github.com/LucasLautaroMartinez" target="_blank">
                <img
                  src={lucasPixelArt}
                  alt="Lucas Martinez"
                  className="px-inner-lg w-full h-full object-cover"
                />
              </a>
            </div>
            <p className="md:mt-4 max-md:mt-3 text-center lg:text-xl md:text-lg sm:text-base max-sm:text-sm leading-4.5">
              Lucas Martinez
            </p>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex justify-center md:gap-16 max-md:gap-8 mb-4">
          <Link
            to="/"
            className="px-wrap-sm hover:text-orange-700 active:text-orange-600 font-medium lg:text-xl md:text-lg sm:text-base max-sm:text-sm"
            onClick={() => {
              setClearInput(true)
              setSearchActive(false)
              setFilteredGames([])
            }}
          >
            <span className="px-inner-sm bg-t-bg/80 inline-block! md:px-5 max-md:px-4 py-0.5">Home</span>
          </Link>
          <Link 
            to="/favorite" 
            className="px-wrap-sm hover:text-orange-700 active:text-orange-600 font-medium lg:text-xl md:text-lg sm:text-base max-sm:text-sm"
          >
            <span className="px-inner-sm bg-t-bg/80 inline-block! md:px-5 max-md:px-4 py-0.5">{t("footer.favText")}</span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-a-darkamber/60 text-sm text-center tracking-wide">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};