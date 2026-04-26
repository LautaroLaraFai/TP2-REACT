import { useTranslation } from "react-i18next"

const LanguageOption = ({ content, languagePrefix, onClose }) => {  
  const { t, i18n } = useTranslation();  
  const currentLang = i18n.language;
  const isActive = currentLang === languagePrefix;

  const handleClick = () => {
    i18n.changeLanguage(languagePrefix);
    localStorage.setItem("language", languagePrefix);
    onClose?.();
  }

  const newContent = content === "Español" 
    ? t("header.LanguageSwitcher.option.spanish")  
    : t("header.LanguageSwitcher.option.english");

  return (  
    <li 
      className={`
        ${isActive 
          ? 'bg-[#505050] border-l-4 border-purple-500' 
          : 'bg-[#3F3E3E]'
        }
        text-center text-2xl px-4 py-2 hover:bg-[#525252] cursor-pointer whitespace-nowrap
      `}
      onClick={handleClick}
    >
      {newContent}
    </li>
  )
}

export default LanguageOption