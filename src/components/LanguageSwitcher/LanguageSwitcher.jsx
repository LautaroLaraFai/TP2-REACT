import LanguageOption from "../LanguageOption/LanguageOption"

const LanguageSwitcher = ({onClose}) => {
  return (
    <div
      className="
        absolute top-full -left-2 mt-2
        w-32 sm:w-25 md:w-30 max-sm:w-20
        rounded-xl overflow-hidden
        border-2 border-a-amber
        shadow-lg
        bg-t-bg
        z-50
      "
    >
      <ul className=" bg-t-bg flex flex-col text-sm sm:text-base md:text-lg">
        <div>
          <LanguageOption content={"Español"} languagePrefix={"es"} onClose={onClose}/> 
        </div>
        <div>
          <LanguageOption content={"Ingles"} languagePrefix={"en"} onClose={onClose}/> 
        </div>
      </ul>
    </div>
  )
}

export default LanguageSwitcher