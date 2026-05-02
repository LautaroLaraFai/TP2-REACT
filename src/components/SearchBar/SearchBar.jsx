import { useEffect, useState } from "react"
import searchIcon from "../../assets/searchIcon.svg"
import getDataByFilter from "../../services/getDataByFilter"

const SearchBar = ({
  clearInput,
  setClearInput,
  setSearchActive,
  setFilteredGames,
  setIsLoading
}) => {

  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleKey = (e) => {
    if (e.key === "Enter") {
      setFilteredGames([])
      setSearchActive(true)
      searchGame(e.target.value)
    }
  }
  const searchGame = async (valueToSearch) => {
      setIsLoading(true)

      const rawValue = valueToSearch
      const newValue = rawValue.trim()
      setValue(rawValue) 
      
      const isSearchByDeveloper = valueToSearch[0] === "@"
      const searchParam = isSearchByDeveloper ? "Developer" : "Name"
      const searchValue = isSearchByDeveloper ? newValue.slice(1).trim() : newValue
      
      if (searchValue === "") {
        setFilteredGames([])
        setIsLoading(false)
        return
      }

    try {
      const games = await getDataByFilter(searchParam, searchValue)
      const resultado = []

      games.forEach((game, index) => {
        if (!game) {
          console.error(`Game en índice ${index} es undefined`)
          return
        }
          resultado.push(game)
      })

      setIsLoading(resultado === 0)
      setFilteredGames(resultado)
    } catch(e){
      console.error("Error: ",e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (clearInput){
      setValue("")
      setClearInput(false)
    }
  }, [clearInput])

  useEffect(() => {
    if(value === ""){
      setSearchActive(false)
    }
  }, [value])

  return (
    <div className="px-wrap-sm flex-1! mx-2 md:mx-4 min-w-0">
      <div className="px-border-sm bg-a-amber -inset-0.5"/>
      <div className="px-inner-sm relative w-full">
        <input
          type="text"
          id="searchBar"
          value={value}
          className="
            w-full bg-p-bg
            h-9 sm:h-10 md:h-11 lg:h-12
            pl-3 pr-10 sm:pr-12 md:pr-14
            text-sm sm:text-base md:text-lg
            focus:outline-none
            focus:bg-t-bg
          "
          onKeyDown={(e) => handleKey(e)}
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