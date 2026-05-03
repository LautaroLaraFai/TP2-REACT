import GameCardSmall from "../GameCardSmall/GameCardSmall.jsx";

const CardGrid = ({ games, toggleFavorite, isFavorite }) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 lg:px-26 md:px-12 sm:px-10 max-sm:px-4">
      {games.map((game) => (
        <GameCardSmall
          key={game.id}
          gameId={game.id}
          image={game.Image}
          price={game.Price}
          name={game.Name}
          alt={game.Name}
          storeUrl="https://store.steampowered.com/..."
          onClick={() => toggleFavorite(game.id)}  
          isFavorite={isFavorite(game.id)}         
        />
      ))}
    </div>
  );
};

export default CardGrid