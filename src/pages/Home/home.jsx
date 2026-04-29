import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import GameCardSmall from "../../components/GameCardSmall/GameCardSmall.jsx"
import GameCardLarge from "../../components/GameCardLarge/GameCardLarge.jsx"
import { useTranslation } from "react-i18next";
import { useGames } from "../../services/globals.jsx";
import Section from "../../layouts/Section.jsx"

export default function Home () {

    const [favorites, setFavorites] = useState([]);
    const { t } = useTranslation()
    const games = useGames()

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

    if (!games) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-screen bg-neutral-800">
                    <div className="text-a-amber text-2xl">{t("home.loading")}</div>
                </div>
            </MainLayout>
        );
    }

  return (
    <MainLayout >
    
    {/* Principal recomendado */}
    <Section>
        <GameCardLarge
            description="Star Wars Jedi: Fallen Order es un videojuego de acción y aventuras ambientado dentro del universo ideado por George Lucas, concretamente entre los episodios"
            image="https://static.wikia.nocookie.net/esstarwars/images/5/57/Fallen-Order-Box-Art.jpg/revision/latest/scale-to-width-down/1000?cb=20191020063836"
            price="60.968,75"
            name="Star Wars - The Fallen Order"
            alt={""}
            storeUrl="https://store.steampowered.com/..."
        />
    </Section>


    {/* Todos los juegos */}
    <Section
      title={t("home.recommendations")}
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
        {games.map((game) => (
          <GameCardSmall
            key={game.id}
            gameId={game.id}
            image={game.Image}
            price={game.Price}
            name={game.Name}
            alt={game.Name}
            storeUrl="https://store.steampowered.com/..."
            onClick={() => toggleFavorite(game.id)}
            isFavorite={favorites.includes(Number(game.id))}
          />
        ))}
      </div>
    </Section>

    
    </MainLayout>
  );
};