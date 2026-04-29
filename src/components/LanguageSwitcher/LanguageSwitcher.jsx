import LanguageOption from "../LanguageOption/LanguageOption"

const LanguageSwitcher = ({onClose}) => {
  return (
    <div
      className="
        px-wrap-sm
      "
    >
    <div className="px-border-sm bg-a-amber md:-inset-0.75 max-md:-inset-0.5"/>
      <div
        className="
          px-inner-sm
          w-32 sm:w-25 md:w-30 max-sm:w-20
          overflow-hidden bg-t-bg z-1000
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
    </div>
  )
}

export default LanguageSwitcher