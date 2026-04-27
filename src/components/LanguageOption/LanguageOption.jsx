import { useTranslation } from "react-i18next"

const LanguageOption = ({ content, languagePrefix, onClose }) => {  
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const isActive = currentLang === languagePrefix

  const handleClick = () => {
    i18n.changeLanguage(languagePrefix)
    localStorage.setItem("language", languagePrefix)
    onClose?.()
  }

  const newContent =
    content === "Español"
      ? t("header.LanguageSwitcher.option.spanish")
      : t("header.LanguageSwitcher.option.english")

  return (  
    <div
      onClick={handleClick}
      className={`
        w-full
        px-3 py-2 md:px-4 md:py-2.5
        text-sm sm:text-base md:text-lg
        text-center whitespace-nowrap
        cursor-pointer
        ${isActive
          ? "bg-s-neutral border-l-4 border-orange-700"
          : "bg-t-bg"
        }

        hover:bg-[#525252]
      `}
    >
      {newContent}
    </div>
  )
}

export default LanguageOption