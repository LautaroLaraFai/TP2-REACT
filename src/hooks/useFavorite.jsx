// hooks/useFavorite.jsx
import { useState, useEffect } from 'react';
import { getDataByID } from '../services/getDataByID';

export default function useFavorite() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGames = async (ids) => {
    setLoading(true);
    if (ids.length === 0) {
      setFavoriteGames([]);
      setLoading(false);
      return;
    }

    const games = await Promise.all(
      ids.map(id => getDataByID(id))
    );
    setFavoriteGames(games.filter(Boolean));
    setLoading(false);
  };

  // Cuando se entre a favorite desde otra pagina
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    const ids = stored.map(Number);
    setFavoriteIds(ids);
    loadGames(ids);
  }, []);
  
  // Cuando se añada a favorite un juego desde la misma pagina
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      const newIds = stored.map(Number);
      setFavoriteIds(newIds);
      loadGames(newIds);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
  }, []);

  const toggleFavorite = (gameId) => {
    const idNumber = Number(gameId);
    const newFavorites = favoriteIds.includes(idNumber)
      ? favoriteIds.filter(id => id !== idNumber)
      : [...favoriteIds, idNumber];
    
    setFavoriteIds(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    loadGames(newFavorites);
    
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const isFavorite = (gameId) => {
    return favoriteIds.includes(Number(gameId));
  };

  return { 
    favoriteIds,      
    favoriteGames,    
    loading,          
    setLoading,
    toggleFavorite,   
    isFavorite        
  };
}