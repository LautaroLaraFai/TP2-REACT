import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import Section from "../../layouts/Section.jsx";
import LeftArrow from "../../assets/left-arrow.svg"

export default function Register() {
  const { t } = useTranslation()
  return (
    <Section>
      <div className="mb-15 bg-p-bg text-a-amber px-6 py-8 flex flex-col items-center">
        <Link to="/" className="self-start flex items-center gap-1 text-a-amber no-underline text-xl mb-8 hover:text-a-darkamber active:text-a-lime">
          <div className="px-inner-sm p-1.5 w-6 h-6 flex items-center justify-center">
            <img src={LeftArrow} />
          </div>
          {t("form.homeButton")}
        </Link>
        <h1 className="text-4xl max-md:text-3xl mb-10 text-center">{t("login.loginTitle")}</h1>
        <LoginForm redirectTo="/" />
      </div>
    </Section>
  );
}