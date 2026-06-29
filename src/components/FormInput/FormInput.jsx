import { useState } from "react";
import OpenEye from "../../assets/open-eye.svg";
import ClosedEye from "../../assets/closed-eye.svg";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  success,
  showToggle = false,
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const floated = focused || value.length > 0;
  const inputType = showToggle ? (showPassword ? "text" : "password") : type;

  const borderColor = error ? "bg-a-red" : success ? "bg-a-lime" : "bg-a-amber";

  return (
    <div className="w-full">
      <div className="px-wrap-sm relative w-full">
        <div className={`px-border-sm -inset-0.5 ${borderColor}`} />
        <div className="px-inner-sm relative w-full">
          <input
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
            }}
            autoComplete="off"
            className="
              w-full bg-p-bg text-a-amber
              h-11 sm:h-12
              px-3.5 pt-[1.1rem] pb-2
              pr-10
              text-sm sm:text-base
              focus:outline-none
              focus:bg-t-bg
            "
          />
          <label
            htmlFor={name}
            className={`text-a-darkamber absolute left-3.5 pointer-events-none transition-all duration-150 ease-out ${
              floated
                ? "top-0.5 translate-y-0 text-sm"
                : "top-1/2 -translate-y-1/2 text-lg"
            }`}
          >
            {label}
          </label>
          {showToggle && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="Mostrar u ocultar contraseña"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-base leading-none"
            >
              <div className="px-inner-sm p-1 w-8 h-8 flex items-center justify-center">
                <img src={showPassword ? OpenEye : ClosedEye} />
              </div>
            </button>
          )}
        </div>
      </div>
      <p
        className={`text-a-red text-md mt-1.5 min-h-[0.9rem] leading-4 ${
          error ? "visible" : "invisible"
        }`}
      >
        {error || "placeholder"}
      </p>
    </div>
  );
}