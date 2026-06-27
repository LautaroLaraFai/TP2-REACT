import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Section from "../../layouts/Section.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { CardGridFavorite } from "../../components/CardGridFavorite/CardGridFavorite.jsx";
import { useFavorites } from "../../context/FavoriteContext";
import { hydrateFavorites } from "../../services/hydrateFavorites.js";

export default function Favorites() {
  const { t } = useTranslation();

  const {
    favorites,
    toggleFavorite,
  } = useFavorites();

  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavoriteGames = async () => {
    try {
      setLoading(true);

      if (favorites.length === 0) {
        setFavoriteGames([]);
        return;
      }
      const games = await hydrateFavorites(favorites);

      setFavoriteGames(games);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadFavoriteGames();
    };
    fetchData();
  }, [favorites]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <Section title={t("favorite.favTitle")}>
      {favoriteGames.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-a-amber text-xl mb-4">
            {t("favorite.favNoGameInfo")}
          </p>

          <Link
            to="/"
            className="text-a-lime hover:text-a-amber transition"
          >
            {t("favorite.favExploreText")}
          </Link>
        </div>
      ) : (
        <CardGridFavorite
          games={favoriteGames}
          toggleFavorite={toggleFavorite}
          animated={true}
        />
      )}
    </Section>
  );
}