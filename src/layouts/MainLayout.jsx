import { useState, useEffect } from "react";
import { Footer } from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import GameCardSmall from "../components/GameCardSmall/GameCardSmall.jsx";
import "../index.css"
import { useTranslation } from "react-i18next";

export default function MainLayout({ children }) {

  const [searchActive, setSearchActive] = useState(false)
  const [filteredGames, setFilteredGames] = useState([])
  const [clearInput, setClearInput] = useState(false)

  const { t } = useTranslation();
  const disableSearch = () => {
    setSearchActive(false)
    setClearInput(true)
  }
  return (
    <>
      <Header 
        setSearchActive={setSearchActive}
        setFilteredGames={setFilteredGames}
        clearInput={clearInput} 
        setClearInput={setClearInput}
      />

      <main 
        className="
          flex flex-col min-h-[calc(100vh-24px)]
          lg:mx-10 mt-10 mx-4 mb-2 md:mx-10 max-md:mx-6
        "
      >
        {/* Contenido */}
        <div className={`${searchActive ? "hidden flex-1!" : "flex-1! px-wrap-lg-t"}`}>
          <div className="px-border-lg-t bg-p-bg md:-inset-0.75 max-md:-inset-0.5"/>
          <div className="px-inner-lg-t bg-p-bg">
            {children}
          </div>
        </div>

        {/* En caso de que se escriba en la searchBar */}
        {searchActive && (
          <div className="px-wrap-lg-t">
            <div className="px-border-lg-t bg-p-bg md:-inset-0.75 max-md:-inset-0.5"/>
            <div className="px-inner-lg-t grid! grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
              {filteredGames.map((game, index) => (
                <div 
                  key={game.id}
                  className="animate-card"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <GameCardSmall
                    image={game.Image}
                    gameId={game.id}
                    price={game.Price}
                    name={game.Name}
                    alt={game.Name}
                    storeUrl="https://store.steampowered.com/..."
                    // onClick={() => toggleFavorite(game.id)} 
                    // isFavorite={favorites.includes(Number(game.id))}
                    disableSearch={disableSearch}
                  />
                </div>
              ))}
              {filteredGames.length === 0 && (
                <div className="col-span-full text-center text-white text-2xl py-10">
                  {t("mainLayout.searchResultsText")}
                </div>
              )}
            </div>
          </div>
        )}
 
        <Footer />
      </main>
    </>
  );
}