import { useState } from "react";
import { Footer } from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import "../index.css";
import SearchResults from "../components/SearchResults/SearchResults.jsx";
import useFavorite from "../hooks/useFavorite.jsx";

export default function MainLayout({ children }) {
  const [searchActive, setSearchActive] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);
  const [clearInput, setClearInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorite()

  const disableSearch = () => {
    setSearchActive(false);
    setClearInput(true);
  };

  return (
    <>
      <Header
        setSearchActive={setSearchActive}
        setFilteredGames={setFilteredGames}
        clearInput={clearInput}
        setClearInput={setClearInput}
        setIsLoading={setIsLoading}
      />

      <main
        className="
          flex flex-col min-h-[calc(100vh-24px)]
          md:mt-10 sm:mt-8 max-sm:mt-6
          md:mb-4 max-md:mb-3
          lg:mx-10 md:mx-8 sm:mx-6 max-sm:mx-4
        "
      >
        {/* Contenido normal */}
        {!searchActive && (
          <div className="flex-1! px-wrap-lg-t">
            <div className="px-border-lg-t bg-p-bg md:-inset-0.75 max-md:-inset-0.5" />
            <div className="px-inner-lg-t bg-p-bg">
              {children}
            </div>
          </div>
        )}

        {/* Resultados de búsqueda */}
        {searchActive && (
          <div className="px-wrap-lg-t">
            <div className="px-border-lg-t bg-p-bg md:-inset-0.75 max-md:-inset-0.5" />
            <div className="px-inner-lg-t">
              <SearchResults
                isLoading={isLoading}
                filteredGames={filteredGames}
                disableSearch={disableSearch}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}