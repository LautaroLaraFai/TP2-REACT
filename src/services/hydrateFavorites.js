import { getDataByID } from "./getDataByID";

export async function hydrateFavorites(favorites) {
  const games = await Promise.all(
    favorites.map(async (favorite) => {
      if (!favorite?.gameId) return null;
      return await getDataByID(favorite.gameId);
    })
  );

  return games.filter(Boolean);
}