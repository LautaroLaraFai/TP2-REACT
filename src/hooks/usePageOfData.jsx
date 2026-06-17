import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import getData from "../services/getData";

const usePageOfData = () => {
  const { i18n } = useTranslation();

  const [games, setGames] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [frontPageGame, setFrontPageGame] = useState(null);
  const [loading, setLoading] = useState(false);

  const page_limit = 20;

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getData({
        cursor,
        limit: page_limit,
      });

      if (
        data?.data?.length === 0 ||
        data?.data?.length < page_limit
      ) {
        setHasMore(false);
      }

      setGames((prev) => [
        ...prev,
        ...(data?.data || []),
      ]);

      setCursor(data?.nextCursor);
    } catch (error) {
      console.error(
        "Error fetching games:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const reloadGames = async () => {
      setGames([]);
      setCursor(null);
      setHasMore(true);
      setFrontPageGame(null);

      const data = await getData({
        limit: page_limit,
      });

      setGames(data?.data || []);
      setCursor(data?.nextCursor);
      setHasMore(data?.hasMore ?? false);
    };

    reloadGames();
  }, [i18n.language]);

  useEffect(() => {
    if (
      games.length > 0 &&
      !frontPageGame
    ) {
      getRandomGame(games);
    }
  }, [games]);

  const getRandomGame = (games) => {
    if (!games || games.length === 0)
      return;

    let i = Math.floor(
      Math.random() * games.length
    );

    if (i === 0) i = 1;

    const randomGame = games[i];

    setFrontPageGame(randomGame);
  };

  return {
    games,
    fetchData,
    hasMore,
    frontPageGame,
  };
};

export default usePageOfData;