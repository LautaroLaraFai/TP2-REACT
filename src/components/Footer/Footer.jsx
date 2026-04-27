import { useTranslation } from "react-i18next"
import { Link } from "react-router"

export const Footer = () => {
    
    const { t } = useTranslation()

    return (
        <div className="bg-[#3E3D3D] flex flex-col align-middle items-center">
            <div className="text-center">
                <Link to="/" className="flex flex-col justify-center"> 
                    Home
                </Link>
                <Link to="/favorite"> 
                    {t("footer.favText")}
                </Link>
            </div>
            <div className="text-[#E7E8C6]/40">
                {t("footer.copyright")}
            </div>
        </div>
    )
}