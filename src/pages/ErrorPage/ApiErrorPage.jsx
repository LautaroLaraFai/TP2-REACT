import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

    const handleRetry = () => {
        sessionStorage.removeItem('redirected');
        window.location.href = '/';
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-p-bg">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-a-red mb-4">{t("apiErrorPage.title")}</h1>
        <p className="text-lg text-a-darkamber mb-8">
          {t("apiErrorPage.message")}
        </p>
        <button
          onClick={handleRetry}
          className="px-wrap-sm text-p-bg text-2xl h-11 sm:h-12 mt-2 cursor-pointer"
        >
          <div className="px-border-sm bg-a-amber -inset-0.5" />
          <div className="px-inner-sm relative w-full h-full flex flex-col justify-center hover:bg-a-darkamber active:bg-a-lime px-6 py-3">
            {t("apiErrorPage.retryButton")}
          </div>
        </button>


      </div>
    </div>
  );
}