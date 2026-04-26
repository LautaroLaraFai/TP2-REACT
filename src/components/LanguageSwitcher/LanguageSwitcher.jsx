import LanguageOption from "../LanguageOption/LanguageOption"

const LanguageSwitcher = ({onClose}) => {
  return (
    <div className="absolute top-full right-0 mt-2 min-w-40 rounded-md shadow-lg overflow-hidden z-50">
      <ul className=" bg-[#3F3E3E] text-xl">
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