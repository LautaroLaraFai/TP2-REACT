import { useTranslation } from "react-i18next"
import { Link } from "react-router"

export const Footer = () => {
    
  const { t } = useTranslation()

  return (
    <footer className="px-wrap-lg-b">
      <div className="px-border-lg-b bg-p-bg md:-inset-0.75 max-md:-inset-0.5"/>
      <div className="px-inner-lg-b bg-s-neutral flex flex-col align-middle items-center">
        <div className="text-center">
          <Link to="/" className="flex flex-col justify-center"> 
            Home
          </Link>
          <Link to="/favorite"> 
            {t("footer.favText")}
          </Link>
        </div>
        <div className="text-a-darkamber">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
    )
}