import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "../config/apiurl";
import { useNavigate } from "react-router-dom";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const navigate = useNavigate();
  const { accessToken, refreshSession, isAuthenticated, loading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loadingState, setLoading] = useState(true);


  const fetchFavorites = async () => {
    if (!accessToken) return [];

    const res = await fetch(`${API_BASE_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 401) {
      try {
        const newAccessToken = await refreshSession();

        const retry = await fetch(
          `${API_BASE_URL}/favorites`,
          {
            headers: {
              Authorization:
                `Bearer ${newAccessToken}`,
            },
          }
        );

        if (!retry.ok) return [];

        return await retry.json();

      } catch {
        return [];
      }
    }

    if (!res.ok) return [];

    return await res.json();
  };


  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !accessToken) {
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
  }, [isAuthenticated, accessToken, loading]);


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

    let tokenToUse = accessToken;

    let res = await fetch(
      `${API_BASE_URL}/favorites/${gameId}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      }
    );

    if (res.status === 401) {
      try {
        tokenToUse = await refreshSession();

        res = await fetch(
          `${API_BASE_URL}/favorites/${gameId}`,
          {
            method,
            headers: {
              Authorization:
                `Bearer ${tokenToUse}`,
            },
          }
        );
      } catch {
        return;
      }
    }

    if (!res.ok) {
      return;
    }

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