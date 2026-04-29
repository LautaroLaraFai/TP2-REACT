import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import { getDataByID } from "../../services/getDataByID.js";
import GameCardSmall from "../../components/GameCardSmall/GameCardSmall.jsx"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Section from "../../layouts/Section.jsx"

export default function Favorites() {
    const [favoriteGames, setFavoriteGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation()

    useEffect(() => {
    const loadFavorites = async () => {
        try {
        const favoritesIdsRaw = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favoritesIds = favoritesIdsRaw.map(id => Number(id));
        
        if (favoritesIds.length === 0) {
            setFavoriteGames([]);
            setLoading(false);
            return;
        }
        
        const games = await Promise.all(
            favoritesIds.map(async (id) => {
            const gameData = await getDataByID(id);
            return gameData;
            })
        );
        
        setFavoriteGames(games.filter(game => game !== null));
        setLoading(false);
        } catch (error) {
        console.error('Error:', error);
        setFavoriteGames([]);
        setLoading(false);
        }
    };

    loadFavorites();
    window.addEventListener('storage', loadFavorites);
    window.addEventListener('focus', loadFavorites);
    
    return () => {
        window.removeEventListener('storage', loadFavorites);
        window.removeEventListener('focus', loadFavorites);
    };
    }, []);

    const removeFavorite = (gameId) => {
        const favoritesIdsRaw = JSON.parse(localStorage.getItem('favorites') || '[]');
        const newFavorites = favoritesIdsRaw.filter(id => Number(id) !== Number(gameId));  
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavoriteGames(prev => prev.filter(game => Number(game.id) !== Number(gameId)));  
    };

    if (loading) {
        return (
        <MainLayout>
            <div className="flex justify-center items-center h-96">
            <p className="text-a-amber text-2xl">{t("favorite.favLoadingText")}</p>
            </div>
        </MainLayout>
        );
    }

  return (
    <MainLayout>
      <Section
        title={t("favorite.favTitle")}
      >
        {favoriteGames.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-a-amber text-xl mb-4">{t("favorite.favNoGameInfo")}</p>
            <Link to="/" className="text-a-lime hover:text-a-amber transition">
              {t("favorite.favExploreText")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
            {favoriteGames.map((game) => (
              <GameCardSmall
                key={game.id}
                gameId={game.id}
                image={game.Image}
                price={game.Price}
                name={game.Name}
                alt={game.Name}
                storeUrl="https://store.steampowered.com/..."
                onClick={() => removeFavorite(game.id)}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </Section>
    </MainLayout>
  );
}