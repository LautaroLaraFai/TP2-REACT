import { Link } from "react-router"
import { useTranslation } from "react-i18next";

export default function ErrorPage () {
    const { t } = useTranslation();

    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
            <h1 className="text-9xl font-bold text-a-amber leading-22">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-a-darkamber mb-8">
                {t("errorPage.title")}
            </h2>
            <Link className="text-2xl hover:underline text-a-lime hover:text-a-darkamber" to="/">
                {t("errorPage.homeButton")}
            </Link>
        </div>
    </div>
}