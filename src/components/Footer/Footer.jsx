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
      <div className="px-inner-lg-b bg-s-neutral flex flex-col items-center py-8 md:py-12">
        
        {/* Contenedor principal - 3 recuadros centrados */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl mx-auto mb-8 md:mb-12">
          
          {/*Marcos*/}
          <div className="flex flex-col items-center w-48 md:w-56 lg:w-64">
            <div className="w-full h-48 md:h-56 lg:h-64 bg-white/10 rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={marcosPixelArt}
                alt="Marcos Chavez" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-a-dark font-medium text-center">
              Marcos Chavez
            </p>
          </div>

          {/* Lauti */}
          <div className="flex flex-col items-center w-48 md:w-56 lg:w-64">
            <div className="w-full h-48 md:h-56 lg:h-64 bg-white/10 rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={lautiPixelArt}
                alt="Lautaro Lara" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-a-darkamber font-bold text-sm uppercase tracking-wider">
                Project Manager
              </p>
              <p className="text-a-dark font-medium">
                Lautaro Lara
              </p>
            </div>
          </div>

          {/*Lucas*/}
          <div className="flex flex-col items-center w-48 md:w-56 lg:w-64">
            <div className="w-full h-48 md:h-56 lg:h-64 bg-white/10 rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={lucasPixelArt}
                alt="Lucas Martinez" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-a-dark font-medium text-center">
              Lucas Martinez
            </p>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex flex-row justify-center gap-6 md:gap-8 mb-4">
          <Link 
            to="/" 
            className="text-a-dark hover:text-a-darkamber transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <Link 
            to="/favorite" 
            className="text-a-dark hover:text-a-darkamber transition-colors duration-200 font-medium"
          >
            {t("footer.favText")}
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-a-darkamber text-sm text-center">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};