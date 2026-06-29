import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { getDataByID } from "../services/getDataByID";
import getData from "../services/getData"

const usePageOfData = () => {
  const [games, setGames] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [frontPageGame, setFrontPageGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();
  const page_limit = 20;

  const fetchData = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    try {
      const data = await getData({ cursor, limit: page_limit });
      
      if (data?.data?.length === 0 || data?.data?.length < page_limit) {
        setHasMore(false);
      }
      
      setGames((prev) => [...prev, ...(data?.data || [])]);
      setCursor(data?.nextCursor);
      
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

  useEffect(() => {
    const reloadFrontPageGame = async () => {
      if (!frontPageGame) return;

      const game = await getDataByID(frontPageGame.id);

      if (game) setFrontPageGame(game);
    };

    reloadFrontPageGame();
  }, [i18n.language]);

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