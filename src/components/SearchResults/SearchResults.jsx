import GameCardSmall from "../components/GameCardSmall/GameCardSmall.jsx";
import Loader from "./Loader/Loader.jsx";

const SearchResults = () => {



{/* En caso de que se escriba en la searchBar */}
        {searchActive && (
          <div className="px-wrap-lg-t">
            <div className="px-border-lg-t bg-p-bg md:-inset-0.75 max-md:-inset-0.5"/>
            <div className="px-inner-lg-t">
              
              {isLoading && (
                <div className="flex justify-center py-10">
                  <Loader />
                </div>
              )}

              {!isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
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
              )}
            </div>
          </div>
        )}
}