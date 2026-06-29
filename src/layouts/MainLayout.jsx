import { useState } from "react";
import { Outlet } from 'react-router'
import { Footer } from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import "../index.css";
import SearchResults from "../components/SearchResults/SearchResults.jsx";
import { useFavorites } from '../context/FavoriteContext.jsx';

export default function MainLayout({ children, showHeader = true, showFooter = true }) {
  const [searchActive, setSearchActive] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);
  const [clearInput, setClearInput] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { toggleFavorite } = useFavorites();

  const disableSearch = () => {
    setSearchActive(false);
    setClearInput(true);
  };

  return (
    <>
      {showHeader && (
        <Header
          setSearchActive={setSearchActive}
          setFilteredGames={setFilteredGames}
          clearInput={clearInput}
          setClearInput={setClearInput}
          setIsLoading={setSearchLoading}
        />
        )
      }

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
          <div className={`flex-1! ${showFooter ? `px-wrap-lg-t` : `px-wrap-lg`}`}>
            <div className={`${showFooter ? `px-border-lg-t` : `px-border-lg`} bg-p-bg md:-inset-0.75 max-md:-inset-0.5`} />
            <div className={`${showFooter ? `px-inner-lg-t` : `px-inner-lg`} bg-p-bg`}>
              <Outlet/>
            </div>
          </div>
        )}

        {/* Resultados de búsqueda */}
        {searchActive && (
          <div className="px-wrap-lg-t">
            <div className="px-border-lg-t bg-p-bg md:-inset-0.75 max-md:-inset-0.5" />
            <div className="px-inner-lg-t">
              <SearchResults
                isLoading={searchLoading}
                filteredGames={filteredGames}
                disableSearch={disableSearch}
                toggleFavorite={toggleFavorite}
              />
            </div>
          </div>
        )}

        {showFooter && <Footer />}

      </main>
    </>
  );
}