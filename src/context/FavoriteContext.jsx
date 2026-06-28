import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "../config/apiurl";
import { useNavigate } from "react-router-dom";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const navigate = useNavigate();
  const { token, isAuthenticated, loading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loadingState, setLoading] = useState(true);


  const fetchFavorites = async () => {
    if (!token) return [];

    const res = await fetch(`${API_BASE_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 403) {
      console.warn("Token rejected by backend");
      return [];
    }

    if (!res.ok) return [];

    return await res.json();
  };


  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !token) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);

      const favs = await fetchFavorites();

      setFavorites(favs);

      setLoading(false);
    };

    load();
  }, [isAuthenticated, token, loading]);


  const toggleFavorite = async (gameId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!gameId) {
      console.warn("toggleFavorite called without gameId");
      return;
    }

    const isFav = isFavorite(gameId);
    const method = isFav ? "DELETE" : "POST";

    await fetch(`${API_BASE_URL}/favorites/${gameId}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updated = await fetchFavorites();
    setFavorites(updated);
  };


  const favoriteIds = favorites.map((f) => Number(f.gameId));
  const isFavorite = (gameId) => favoriteIds.includes(Number(gameId));


  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        loadingState,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoriteContext);