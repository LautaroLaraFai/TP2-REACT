import GameCardSmall from "../GameCardSmall/GameCardSmall.jsx";

const CardGrid = ({
  games,
  toggleFavorite,
  disableSearch,
  animated = false
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4 md:mb-30 max-md:mb-20">
      {games.map((game, index) => {
        const Wrapper = animated ? "div" : null;

        const content = (
          <GameCardSmall
            key={game.id}
            gameId={game.id}
            image={game.Image}
            price={game.Price}
            name={game.Name}
            alt={game.Name}
            onClick={toggleFavorite ? () => toggleFavorite(game.id) : undefined}
            disableSearch={disableSearch}
          />
        );

        return animated ? (
          <div
            key={game.id}
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

export default CardGrid;