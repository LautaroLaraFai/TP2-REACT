import { useEffect, useState } from "react";

const usePageOfData = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [frontPageGame, setFrontPageGame] = useState(null);

  const page_limit = 6;

  const fetchData = () => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games?page=${page}&limit=${page_limit}`);
        const data = await response.json();
        if (data?.length === 0) {
          setHasMore(false);
          return;
        }
        setGames((game) => [...game, ...data]);

      } catch (error) {
        console.error("Error ferching games:", error);
      }
    };
    fetchGames();
    setPage((prev) => prev + 1);
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