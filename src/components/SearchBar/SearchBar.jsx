import searchIcon from "../../assets/searchIcon.svg"

const SearchBar = ({
  setSearchActive,
  games,
  setFilteredGames
}) => {
  const handleChange = (e) => {
    const textValue = e.target.value
    const hasText = textValue !== ""
    setSearchActive(hasText)
    if (hasText) {
      const resultado = []
      games.map((game, index) => {
        if (!game) {
          console.error(`Game en índice ${index} es undefined`)
          return
        }
        if (!game.Name) {
          console.error(`Game en índice ${index} no tiene name:`, game)
          return
        }
        if (game.Name.toLowerCase().includes(textValue.toLowerCase())) {
          resultado.push(game)
        }
      })
      setFilteredGames(resultado)
    } else {
      setFilteredGames([])
    }
  }

  return (
    <div className="px-wrap-sm flex-1! mx-2 md:mx-4 min-w-0">
      <div className="px-border-sm bg-a-amber -inset-0.5"/>
      <div className="px-inner-sm relative w-full">
        <input
          type="text"
          id="searchBar"
          className="
            w-full bg-p-bg
            h-9 sm:h-10 md:h-11 lg:h-12
            pl-3 pr-10 sm:pr-12 md:pr-14
            text-sm sm:text-base md:text-lg
            focus:outline-none
            focus:bg-t-bg
          "
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="searchBar">
          <img
            src={searchIcon}
            alt="searchIcon"
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              h-4 sm:h-5 md:h-6 lg:h-7
              w-auto pointer-events-none
            "
          />
        </label>
      </div>
    </div>
  )
}

export default SearchBar