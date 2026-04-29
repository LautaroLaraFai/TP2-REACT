import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout.jsx";
import getData from "../../services/getData.js";
import GameCardSmall from "../../components/GameCardSmall/GameCardSmall.jsx"
import GameCardLarge from "../../components/GameCardLarge/GameCardLarge.jsx"
import { useTranslation } from "react-i18next";

import { Link } from "react-router";

export default function Home () {
    const [games, setGames] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
    // 1. Cargar datos iniciales
    const initializeData = async () => {
        try {
            const gamesData = await getData();
            setGames(gamesData);
            
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

    {/* Principal recomendado */}
    <section className="lg:px-20 md:px-14 sm:px-10 max-sm:px-6 pt-16 pb-20 max-sm:pt-12 max-sm:pb-16">
        <GameCardLarge
            description="Star Wars Jedi: Fallen Order es un videojuego de acción y aventuras ambientado dentro del universo ideado por George Lucas, concretamente entre los episodios"
            image="https://static.wikia.nocookie.net/esstarwars/images/5/57/Fallen-Order-Box-Art.jpg/revision/latest/scale-to-width-down/1000?cb=20191020063836"
            price="60.968,75"
            name="Star Wars - The Fallen Order"
            alt={""}
            storeUrl="https://store.steampowered.com/..."
        />
    </section>


    {/* Todos los juegos */}
    <section className="w-full pt-0">
 
      <div className="border-t-2 border-a-amber">
        <div className="inline-block md:px-36 sm:px-10 max-sm:px-6 py-4 max-sm:py-2 border-b-2 border-r-2 border-a-amber rounded-br-lg">
          <h2 className="md:text-[1.8em] tracking-[.07em] text-a-amber">
            Recomendaciones
          </h2>
        </div>
      </div>
 
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
    </section>


    
    </MainLayout>
  );
};