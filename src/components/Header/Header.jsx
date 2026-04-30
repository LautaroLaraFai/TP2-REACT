import logo from "../../assets/Logo.svg"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import { Link } from "react-router"
import { useState } from "react"
import SearchBar from "../SearchBar/SearchBar"
import { useGames } from "../../services/globals"

const Header = ({
  clearInput,
  setClearInput,
  setSearchActive,
  setFilteredGames
}) => {
  const { t } = useTranslation()
  const games = useGames()

  const [isLangSwitcherOpen, setIsLangSwitcherOpen] = useState(false)
  const onClose = () => {
    setIsLangSwitcherOpen(false)
  }
  return (
    <div
      className="
        px-wrap-lg
        z-1000 flex!
        sticky! top-6 md:top-8
        mt-6 mb-2 md:mt-10
        lg:mx-10 mx-4 md:mx-10 max-md:mx-6
      "
    >
      <div className="px-border-lg bg-a-amber md:-inset-0.75 max-md:-inset-0.5" />
      <div
        className="
          px-inner-lg
          flex items-center justify-between
          h-16 md:h-18
          gap-3 md:gap-6
          bg-p-bg
          px-4 sm:px-6 md:px-8 lg:px-10
        "
      >
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="logo"
            className="h-6 sm:h-7 md:h-8 lg:h-10"
          />
          <span
            className="
              pl-1 sm:pl-2 md:pl-3
              text-xl sm:text-2xl md:text-3xl lg:text-4xl
              whitespace-nowrap
            "
          >
            MAETS
          </span>
        </Link>
        <SearchBar
          clearInput={clearInput} 
          setClearInput={setClearInput}
          setSearchActive={setSearchActive}
          games={games}
          setFilteredGames={setFilteredGames}
        />
        <div
          className="
            flex items-center
            gap-2 sm:gap-3 md:gap-6
            shrink-0
          "
        >
          <Link
            to="/favorite"
            className="
              text-sm sm:text-base md:text-lg lg:text-xl
              font-medium
              w-14 sm:w-16 md:w-22 lg:w-26
              text-center whitespace-nowrap
              hover:text-orange-700
            "
          >
            {t("header.favText")}
          </Link>
          <div className="relative">
            <button
              className="
                text-sm sm:text-base md:text-lg lg:text-xl
                font-medium
                w-14 sm:w-16 md:w-22 lg:w-26
                text-center whitespace-nowrap
                hover:text-orange-700
              "
              onClick={() => setIsLangSwitcherOpen(!isLangSwitcherOpen)}>
              {t("header.langText")}
            </button>
          </div>
        </div>
      </div>
      {isLangSwitcherOpen && (
        <div className="absolute right-8 top-full -mt-2 z-1001">
          <LanguageSwitcher onClose={onClose} />
        </div>
      )}
    </div>
  )
}
export default Header