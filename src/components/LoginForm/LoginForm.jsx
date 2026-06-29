import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormInput from "../FormInput/FormInput";
import Loader from "../Loader/Loader";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { initialValuesLogin } from "../../services/formValidation";
import { loginRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm({ redirectTo = "/" }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const [values, setValues] = useState(initialValuesLogin);

  const { errors, submitted, status, handleSubmit } =
    useFormSubmit({
      values,
      onRequest: async (data) => {
        const result = await loginRequest(data);

        if (result.ok) {
          await login(
            result.accessToken,
            result.refreshToken
          );
        }

        return result;
      },
      navigate,
      redirectTo,
      typeForm: "login",
      t,
    });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  if (status === "loading") return <Loader />;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-12" role="status">
        <span
          className="w-14 h-14 flex items-center justify-center border-2 border-a-lime text-a-lime text-2xl"
          aria-hidden="true"
        >
          ✓
        </span>
        <p className="text-a-lime">{t("register.registerSuccess")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-95 flex flex-col gap-4">
      <FormInput
        label={t("form.formEmail")}
        name="email"
        value={values.email}
        onChange={handleChange}
        error={submitted ? errors.email : ""}
      />

      <FormInput
        label={t("form.formPassword")}
        name="password"
        type="password"
        showToggle
        value={values.password}
        onChange={handleChange}
        error={submitted ? errors.password : ""}
      />

      <button
        type="submit"
        className="px-wrap-sm text-p-bg text-2xl h-11 sm:h-12 mt-2 cursor-pointer"
      >
        <div className="px-border-sm bg-a-amber -inset-0.5" />
        <div className="px-inner-sm relative w-full h-full flex flex-col justify-center hover:bg-a-darkamber active:bg-a-lime">
          {t("login.loginButton")}
        </div>
      </button>

      <p className="text-center text-lg">{t("login.loginQuestion")}
        <Link to="/register" className="text-a-lime hover:text-a-darkamber active:text-a-red">&nbsp;{t("login.loginQuestionRegister")}</Link>
      </p>
    </form>
  );
}