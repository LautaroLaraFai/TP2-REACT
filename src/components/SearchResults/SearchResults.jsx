import GameCardSmall from "../GameCardSmall/GameCardSmall.jsx";
import Loader from "../../layouts/Loader/Loader.jsx";
import { useTranslation } from "react-i18next";

export default function SearchResults({
  isLoading,
  filteredGames,
  disableSearch
}) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
      {filteredGames.map((game, index) => (
        <div
          key={game?.id}
          className="animate-card"
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          <GameCardSmall
            image={game?.Image}
            gameId={game?.id}
            price={game?.Price}
            name={game?.Name}
            alt={game?.Name}
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
  );
}