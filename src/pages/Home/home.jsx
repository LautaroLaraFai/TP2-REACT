import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import GameCardSmall from "../../components/GameCardSmall/GameCardSmall.jsx"
import GameCardLarge from "../../components/GameCardLarge/GameCardLarge.jsx"
import { useTranslation } from "react-i18next";
import { useGames } from "../../services/globals.jsx";
import Section from "../../layouts/Section.jsx"
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "../../layouts/Loader/Loader.jsx"
import usePageOfData from "../../hooks/usePageOfData.jsx"

export default function Home () {

  const [favorites, setFavorites] = useState([]);
  const { t } = useTranslation()

  const { games, fetchData, hasMore, frontPageGame } = usePageOfData();

  useEffect(() => {
    // 1. Cargar datos iniciales
    const initializeData = async () => {
      try {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favoritesAsNumbers = storedFavorites.map(id => Number(id));
        setFavorites(favoritesAsNumbers);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
    initializeData();

    // 2. Sincronizar favoritos entre pestañas 
    const syncFavorites = () => {
      try {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favoritesAsNumbers = storedFavorites.map(id => Number(id));
        setFavorites(favoritesAsNumbers);
      } catch (error) {
        console.error('Error syncing favorites:', error);
      }
    };

    window.addEventListener('storage', syncFavorites);
    window.addEventListener('focus', syncFavorites);
    
    return () => {
      window.removeEventListener('storage', syncFavorites);
      window.removeEventListener('focus', syncFavorites);
    };
  }, []);


  const toggleFavorite = (gameId) => {
    const idNumber = Number(gameId);
    const newFavorites = favorites.includes(idNumber) 
      ? favorites.filter(id => Number(id) !== idNumber)
      : [...favorites, idNumber];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

 
  return (
    <MainLayout>
    <InfiniteScroll
      dataLength={games.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div className="w-full h-10 px-auto flex justify-center items-center overflow-hidden mb-5">
          <Loader/>
        </div>
      }
      endMessage={
        <div className="text-a-amber text-2xl w-full flex justify-center mt-5 mb-10">
          Ya haz visto todo!!
        </div>
      }
    >
      {/* Front Page Game */}
      <Section>
        {frontPageGame && (
          <GameCardLarge
            key={frontPageGame?.id}
            name={frontPageGame?.Name}
            description={frontPageGame?.Description}
            price={frontPageGame?.Price}
            image={frontPageGame?.Image}
          />
        )}
      </Section>


      {/* All the Games */}
      <Section
        title={t("home.recommendations")}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
          {games && (games.filter(game => game?.id !== frontPageGame?.id).map((game) => (
            <GameCardSmall
              key={game?.id}
              gameId={game?.id}
              image={game?.Image}
              price={game?.Price}
              name={game?.Name}
              alt={game?.Name}
              onClick={() => toggleFavorite(game?.id)}
              isFavorite={favorites.includes(Number(game?.id))}
            />
          )))}
        </div>
      </Section>

    </InfiniteScroll>
    </MainLayout>
  );
};