import { useState } from "react";
import { Footer } from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import GameCardSmall from "../components/GameCardSmall/GameCardSmall.jsx";
import "../index.css"
import { useTranslation } from "react-i18next";

export default function MainLayout({ children, games = [] }) {

  const [searchActive, setSearchActive] = useState(false)
  const [filteredGames, setFilteredGames] = useState([])
  
  const { t } = useTranslation();

  return (
    <>
      <Header 
        setSearchActive={setSearchActive}
        games={games}
        setFilteredGames={setFilteredGames}
      />

      <main 
        className="
          flex flex-col min-h-[calc(100vh-24px)] rounded-xl bg-(--color-p-bg)
          mt-10 mb-2 md:mr-10 md:ml-10 max-md:mr-6 max-md:ml-6
        "
      >
        {/* Contenido */}
        <div className={`${searchActive ? "hidden flex-1" : "flex-1"}`}>
          {children}
        </div>

        {/* En caso de que se escriba en la searchBar */}
        {searchActive && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
            {filteredGames.map((game, index) => (
              <div 
                key={game.id}
                className="animate-card"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <GameCardSmall
                  image={game.Image}
                  price={game.Price}
                  name={game.Name}
                  alt={game.Name}
                  storeUrl="https://store.steampowered.com/..."
                  onClick={""}
                />
              </div>
            ))}
            {filteredGames.length === 0 && (
              <div className="col-span-full text-center text-white text-2xl py-10">
                {t("mainLayout.searchResultsText")}
              </div>
            )}
          </div>
        )}
 
        <Footer />
      </main>
    </>
  );
}