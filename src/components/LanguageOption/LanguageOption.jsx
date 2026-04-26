import { useTranslation } from "react-i18next"

const LanguageOption = ({ content }) => {  
  const { t } = useTranslation();
  
  const newContent = content === "Español" 
      ? t("header.LanguageSwitcher.option.spanish")  
      : t("header.LanguageSwitcher.option.english") 

  return (  
    <li className="text-center text-2xl px-4 py-2 hover:bg-[#525252] cursor-pointer whitespace-nowrap">
      {newContent}
    </li>
  )
}

export default LanguageOption