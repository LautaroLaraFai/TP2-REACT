import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function useFavorite() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/games?limit=100`);
      const data = await response.json();
      
      const favoriteGamesList = data.data?.filter(game => game.isFavorite === true) || [];
      setFavoriteGames(favoriteGamesList);
      setFavoriteIds(favoriteGamesList.map(game => game.id));
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (gameId) => {
    const idNumber = Number(gameId);
    const isCurrentlyFavorite = favoriteIds.includes(idNumber);
    
    try {
      const response = await fetch(`${API_BASE_URL}/games/${idNumber}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !isCurrentlyFavorite })
      });
      
      if (response.ok) {
        await loadFavorites();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const isFavorite = (gameId) => {
    return favoriteIds.includes(Number(gameId));
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return { 
    favoriteIds,      
    favoriteGames,    
    loading,          
    setLoading,
    toggleFavorite,   
    isFavorite        
  };
}