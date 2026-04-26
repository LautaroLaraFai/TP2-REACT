// components/Header/Header.jsx
import logo from "../../assets/Logo.svg"
import searchIcon from "../../assets/searchIcon.svg"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"

// const { t } = useTranslation();

const Header = () => {
  
  return (
    <div className="flex items-center gap-8 justify-between bg-[#252525] px-4 py-2 w-screen h-35">
      <div className="flex items-center m-3">
        <img 
          src={logo} 
          alt="logo" 
          className="h-20 cursor-pointer"
        /> 
        <span className="text-5xl p-3 cursor-pointer"> MAETS </span>
        </div>
        <div className="relative mx-auto w-auto">
            <input 
                type="text" 
                id="searchBar" 
                className="focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transtion-all duration-200 pl-4 pr-26 text-5xl border-2 min-w-4xl h-20 border-[#E7E8C6] rounded-[10px]"
            />
            <label htmlFor="searchBar">
                <img 
                  src={searchIcon} 
                  alt="searchIcon" 
                  className="p-5 h-25 w-auto absolute top-1/2 -translate-y-1/2 right-0"
                />
            </label>
        </div>

        <div className=" flex items-center gap-8">
            <button className=" hover:text-purple-400 transition text-5xl font-medium whitespace-nowrap">
            Favoritos {/* Traducir */}
            </button>
            <div className="relative">
              <button className="hover:text-purple-400 transition text-5xl font-medium whitespace-nowrap">
              Idioma {/* Traducir */}
              </button>
              <LanguageSwitcher />
            </div>
        </div>

        

    </div>
  )
}

export default Header