import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../FormInput/FormInput.jsx";
import Loader from "../Loader/Loader.jsx";
import { validateField, validateAll, initialValuesRegister } from "../../services/formValidation.js";
import { useFormSubmit } from "../../hooks/useFormSubmit.jsx";


// Simula llamada a backend. Reemplazar por fetch real cuando exista API.
async function fakeRegisterRequest(data) {
  await new Promise((r) => setTimeout(r, 1200));
  if (data.email === "ocupado@test.co") {
    return { ok: false, field: "email", message: "Este correo ya está registrado" };
  }
  return { ok: true };
}

export default function RegisterForm({ redirectTo = "/" }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValuesRegister);

  const { errors, submitted, status, handleSubmit } = useFormSubmit({
    values,
    validateField,
    onRequest: fakeRegisterRequest,
    redirectTo: redirectTo,
    navigate,
    typeForm: "register"
  });

  const { t } = useTranslation()

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  if (status === "loading") {
    return <Loader />;
  }

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
    <form className="w-full max-w-95 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <FormInput
        label={t("form.formName")}
        name="name"
        value={values.name}
        onChange={handleChange}
        error={submitted ? errors.name : ""}
        success={submitted && !errors.name}
      />
      <FormInput
        label={t("form.formEmail")}
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={submitted ? errors.email : ""}
        success={submitted && !errors.email}
      />
      <FormInput
        label={t("form.formPassword")}
        name="password"
        type="password"
        showToggle
        value={values.password}
        onChange={handleChange}
        error={submitted ? errors.password : ""}
        success={submitted && !errors.password}
      />

      <button
        type="submit"
        className="px-wrap-sm text-p-bg text-2xl h-11 sm:h-12 mt-2 cursor-pointer"
      >
        <div className="px-border-sm bg-a-amber -inset-0.5" />
        <div className="px-inner-sm relative w-full h-full flex flex-col justify-center hover:bg-a-darkamber active:bg-a-lime">
          {t("register.registerButton")}
        </div>
      </button>

      <p className="text-center text-lg">{t("register.registerQuestion")}
        <Link to="/login" className="text-a-lime hover:text-a-darkamber active:text-a-red">&nbsp;{t("register.registerQuestionLogin")}</Link>
      </p>
    </form>
  );
}