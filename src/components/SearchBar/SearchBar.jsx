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
    const newValue = e.target.value
    setValue(newValue)

    if (newValue.trim() === "") {
      setSearchActive(false)
      setFilteredGames([])
    }
  }

  const handleKey = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim()

      if (value === "") {
        setSearchActive(false)
        setFilteredGames([])
        return
      }

      setFilteredGames([])
      setSearchActive(true)
      searchGame(value)
    }
  }

  const searchGame = async (valueToSearch) => {
    setIsLoading(true)

    const rawValue = valueToSearch
    const newValue = rawValue.trim()
    setValue(rawValue)

    const isSearchByDeveloper = valueToSearch[0] === "@"
    const searchParam = isSearchByDeveloper ? "Developer" : "Name"
    const searchValue = isSearchByDeveloper
      ? newValue.slice(1).trim()
      : newValue

    if (searchValue === "") {
      setFilteredGames([])
      setIsLoading(false)
      setSearchActive(false)
      return
    }

    try {
      const games = await getDataByFilter(searchParam, searchValue)

      if (!Array.isArray(games)) {
        console.error("Respuesta inválida:", games)
        setFilteredGames([])
        setIsLoading(false)
        return
      }

      setFilteredGames(games)
      setIsLoading(false)

    } catch (e) {
      console.error("Error: ", e)
      setFilteredGames([])
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (clearInput){
      setValue("")
      setClearInput(false)
    }
  }, [clearInput])

  return (
    <div className="px-wrap-sm flex-1 mx-2 md:mx-4 min-w-0">
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
            [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_var(--color-t-bg)_inset]
            [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-a-amber)]
            [&:-webkit-autofill:focus]:[box-shadow:0_0_0px_1000px_var(--color-t-bg)_inset]
            [&:-webkit-autofill:focus]:[-webkit-text-fill-color:var(--color-a-amber)]
            [&:-webkit-autofill]:font-jersey
            caret-a-amber
          "
          onKeyDown={handleKey}
          onChange={handleChange}
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