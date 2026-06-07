import { useEffect, useState } from "react";
import getData from "../services/getData"

const usePageOfData = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [frontPageGame, setFrontPageGame] = useState(null);
  const [loading, setLoading] = useState(false);

  const page_limit = 6;

  const fetchData = async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const data = await getData({ page, limit: page_limit });
      
      if (data?.length === 0) {
        setHasMore(false);
        return;
      }
      
      setGames((game) => [...game, ...data]);
      setPage((prev) => prev + 1);
      
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (games.length > 0 && !frontPageGame) {
      getRandomGame(games);
    }
  }, [games]);

  const getRandomGame = (games) => {
    if (!games || games.length === 0) return;

    let i = Math.floor(Math.random() * games.length);
    if (i === 0) i = 1;
    const randomGame = games[i];

    setFrontPageGame(randomGame);
  };

  return { games, fetchData, hasMore, frontPageGame };
}

export default usePageOfData;