import { useState } from "react";
import { validateField } from "../services/formValidation";

export function useFormSubmit({
  values,
  onRequest,
  navigate,
  redirectTo,
  typeForm,
  t,
}) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors = {};

    Object.keys(values).forEach((key) => {
      newErrors[key] = validateField(
        key,
        values[key],
        typeForm,
        t
      );
    });

    const hasErrors = Object.values(newErrors).some(Boolean);

    setErrors(newErrors);

    if (hasErrors) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const result = await onRequest(values);

    if (!result.ok) {
      setErrors({
        [result.field]: result.message,
      });
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("success");

    if (redirectTo && navigate) {
      setTimeout(() => navigate(redirectTo), 800);
    }
  };

  return {
    errors,
    submitted,
    status,
    handleSubmit,
  };
}