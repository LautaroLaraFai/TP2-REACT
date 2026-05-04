import GameCardMedium from "../GameCardMedium/GameCardMedium.jsx";

export const CardGridFavorite = ({
  games,
  toggleFavorite,
  isFavorite,
  animated = false
}) => {
  return (
    <div className="flex flex-col gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4 md:mb-30 max-md:mb-20">
      {games.map((game, index) => {
        const content = (
          <GameCardMedium
            key={game?.id}
            gameId={game?.id}
            name={game?.Name}
            price={game?.Price}
            image={game?.Image}
            genres={game?.Genres}
            releaseDate={game?.ReleaseDate}
            onClick={() => toggleFavorite(game.id)}
            isFavorite={isFavorite(game.id)}
          />
        );

        return animated ? (
          <div
            key={game?.id}
            className="animate-card"
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            {content}
          </div>
        ) : (
          content
        );
      })}
    </div>
  );
};