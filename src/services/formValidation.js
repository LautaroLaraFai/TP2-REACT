import { EMAIL_RE } from "../const/form.js";

export const initialValuesRegister = { name: "", email: "", password: "" };
export const initialValuesLogin = { email: "", password: "" };

export function validateField(name, value, typeForm, t) {
  if (name === "name") {
    if (!value.trim()) return t("validation.nameRequired");
    if (value.trim().length < 3) return t("validation.nameMinLength");
  }

  if (name === "email") {
    if (!value.trim()) return t("validation.emailRequired");
    if (!EMAIL_RE.test(value)) return t("validation.emailInvalid");
  }

  if (name === "password") {
    if (!value) return t("validation.passwordRequired");
    if (typeForm === "register" && value.length < 8) {
      return t("validation.passwordMinLength");
    }
  }

  return "";
}