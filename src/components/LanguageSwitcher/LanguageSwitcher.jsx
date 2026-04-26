import { useTranslation } from "react-i18next"
import LanguageOption from "../LanguageOption/LanguageOption"

const LanguageSwitcher = () => {
  const { t } = useTranslation()
  return (
    <div className="absolute top-full right-0 mt-2 min-w-40 rounded-md shadow-lg overflow-hidden z-50">
      <ul className=" bg-[#3F3E3E] text-xl">
        <LanguageOption content={"Español"} /> {/*TRADUCIR */}
        <LanguageOption content={"Ingles"} /> {/*TRADUCIR */}
      </ul>
    </div>
  )
}

export default LanguageSwitcher