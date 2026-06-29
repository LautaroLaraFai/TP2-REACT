import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoriteContext";

export function useOptimisticFavorite(gameId) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const realFavorite = isFavorite(gameId);
  const [optimisticFavorite, setOptimisticFavorite] = useState(realFavorite);

  useEffect(() => {
    setOptimisticFavorite(realFavorite);
  }, [realFavorite]);

  const handleFavoriteClick = async () => {
    const previousState = optimisticFavorite;
    const nextState = !previousState;

    setOptimisticFavorite(nextState);

    try {
      await toggleFavorite(gameId);
    } catch (error) {
      setOptimisticFavorite(previousState);
    }
  };

  return {
    optimisticFavorite,
    handleFavoriteClick,
  };
}