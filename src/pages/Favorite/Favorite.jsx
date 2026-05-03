import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import Section from "../../layouts/Section.jsx";
import { useFavorite } from "../../hooks/useFavorite.jsx";
import { CardGridFavorite } from "../../components/CardGridFavorite/CardGridFavorite.jsx";
import Loader from "../../layouts/Loader/Loader.jsx";

export default function Favorites() {
  const { t } = useTranslation();
  const { favoriteGames, loading, toggleFavorite, isFavorite } = useFavorite();
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Section title={t("favorite.favTitle")}>
        {favoriteGames.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-a-amber text-xl mb-4">{t("favorite.favNoGameInfo")}</p>
            <Link to="/" className="text-a-lime hover:text-a-amber transition">
              {t("favorite.favExploreText")}
            </Link>
          </div>
        ) : (
          <CardGridFavorite toggleFavorite={toggleFavorite} isFavorite={isFavorite} games={favoriteGames}/>
        )}
      </Section>
    </MainLayout>
  );
}