import { useState, useEffect } from 'react';
import { getDataByID } from '../services/getDataByID';

export default function useFavorite() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteIds(stored.map(Number));
  }, []);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      if (favoriteIds.length === 0) {
        setFavoriteGames([]);
        setLoading(false);
        return;
      }

      const games = await Promise.all(
        favoriteIds.map(id => getDataByID(id))
      );
      setFavoriteGames(games.filter(Boolean));
      setLoading(false);
    };

    loadGames();
  }, [favoriteIds]);

  const toggleFavorite = (gameId) => {
    const idNumber = Number(gameId);
    const newFavorites = favoriteIds.includes(idNumber)
      ? favoriteIds.filter(id => id !== idNumber)
      : [...favoriteIds, idNumber];
    
    setFavoriteIds(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
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
};