import logo from "../../assets/Logo.svg"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import { Link } from "react-router-dom"
import { useState } from "react"
import SearchBar from "../SearchBar/SearchBar"
import { useAuth } from "../../context/AuthContext.jsx"

const Header = ({
  clearInput,
  setClearInput,
  setSearchActive,
  setFilteredGames,
  setIsLoading
}) => {
  const { t } = useTranslation()
  const { isAuthenticated, logout, user } = useAuth()
  const [isLangSwitcherOpen, setIsLangSwitcherOpen] = useState(false)
  const onClose = () => {setIsLangSwitcherOpen(false)}

  return (
    <header
      className="
        px-wrap-lg
        z-1000 flex!
        sticky! top-6 md:top-8
        md:mt-10 sm:mt-8 max-sm:mt-6
        lg:mx-10 md:mx-8 sm:mx-6 max-sm:mx-4
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
        <Link
          to="/"
          className="flex items-center shrink-0"
          onClick={() => {
            setClearInput(true)
            setSearchActive(false)
            setFilteredGames([])
          }}
          aria-label="to home"
        >
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
          setFilteredGames={setFilteredGames}
          setIsLoading={setIsLoading}
        />
        <div
          className="
            flex items-center
            gap-2 sm:gap-3 md:gap-6
            shrink-0
          "
        >
          <div
            className="
              flex items-center
              gap-2 sm:gap-3 md:gap-6
              shrink-0
            "
          >
            {isAuthenticated ? (
              <>
                <Link
                  to="/favorite"
                  className="
                    text-sm sm:text-base md:text-lg lg:text-xl
                    font-medium
                    w-14 sm:w-16 md:w-22 lg:w-26
                    text-center whitespace-nowrap
                    hover:text-orange-700 active:text-orange-600
                  "
                  onClick={() => {
                    setClearInput(true)
                    setSearchActive(false)
                    setFilteredGames([])
                  }}
                >
                  {t("header.favText")}
                </Link>
                
                <button
                  onClick={logout}
                  className="
                    text-center cursor-pointer
                    w-32 sm:w-25 md:w-30 max-sm:w-20
                    overflow-hidden bg-p-bg z-1000
                    px-wrap-sm font-medium text-p-bg py-1 px-0.5
                    text-sm sm:text-base md:text-lg lg:text-xl
                    hover:text-orange-700 active:text-orange-600
                  "
                >
                  <div className="px-border-sm bg-a-amber -inset-0.5" />
                  <div className="px-inner-sm relative w-full h-full flex flex-col justify-center hover:bg-a-darkamber active:bg-a-lime">
                    {t("header.logoutText")}
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    text-center cursor-pointer
                    w-32 sm:w-25 md:w-30 max-sm:w-20
                    overflow-hidden bg-p-bg z-1000
                    px-wrap-sm font-medium text-p-bg py-1 px-0.5
                    text-sm sm:text-base md:text-lg lg:text-xl
                    hover:text-orange-700 active:text-orange-600
                  "
                >
                  <div className="px-border-sm bg-a-amber -inset-0.5" />
                  <div className="px-inner-sm relative w-full h-full flex flex-col justify-center hover:bg-a-darkamber active:bg-a-lime">
                    {t("header.loginText")}
                  </div>
                </Link>
              </>
            )}

            <div className="relative">
              <button
                className="
                  text-sm sm:text-base md:text-lg lg:text-xl
                  font-medium
                  w-14 sm:w-16 md:w-22 lg:w-26
                  text-center whitespace-nowrap
                  hover:text-orange-700 active:text-orange-600 cursor-pointer
                "
                onClick={() => setIsLangSwitcherOpen(!isLangSwitcherOpen)}
              >
                {t("header.langText")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLangSwitcherOpen && (
        <div className="absolute right-8 top-full -mt-2 z-1001">
          <LanguageSwitcher onClose={onClose} />
        </div>
      )}
    </header>
  )
}
export default Header