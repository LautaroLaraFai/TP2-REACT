import Loader from "../Loader/Loader.jsx";
import { useTranslation } from "react-i18next";
import CardGrid from "../CardGrid/CardGrid.jsx";

export default function SearchResults({
  isLoading,
  filteredGames,
  disableSearch,
  toggleFavorite,
  isFavorite
}) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  if (filteredGames.length === 0) {
    return (
      <div className="text-center text-white text-2xl py-10">
        {t("mainLayout.searchResultsText")}
      </div>
    );
  }

  return (
    <CardGrid
      games={filteredGames}
      toggleFavorite={toggleFavorite}
      isFavorite={isFavorite}
      disableSearch={disableSearch}
      animated={true}
    />
  );
}