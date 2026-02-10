import React, { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  maxLength,
  icon: Icon,
  iconColor,
  error,
  autoFocus = false,
  isEnabledIcon = true,
  className,
  wrapperClassName,
  label,
  
  requiredText = "*",
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const isPassword = type === "password";

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const shouldFloatLabel = isFocused || (value && value.length > 0);

  return (
    <div className={`relative flex flex-col gap-1 w-full ${wrapperClassName || ""}`}>
      {label && (
        <label
          className={`text-sm font-medium mb-0.5 transition-all duration-200 ${
            disabled ? "text-disabled" : "text-text-primary"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">{requiredText}</span>}
        </label>
      )}

      <div className="relative w-full">
        {Icon && (
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              iconColor ? `text-${iconColor}` : "text-text-muted"
            }`}
          >
            <Icon size={18} />
          </span>
        )}

        <input
          ref={inputRef}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={handleChange}
          placeholder={shouldFloatLabel ? "" : placeholder}
          required={required}
          autoFocus={autoFocus}
          minLength={minLength}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`w-full rounded border px-4 py-3 text-base shadow-sm transition-all duration-200
            placeholder:text-base focus:outline-none focus:ring-4 focus:ring-indigo-600/20
            ${Icon ? "pl-10" : ""} ${isPassword ? "pr-12" : "pr-3"} focus:outline-none
            ${disabled ? "bg-disabled text-text-muted cursor-not-allowed" : "bg-surface text-text-primary"}
            ${error ? "border-danger" : isFocused ? "border-primary" : "border-border-grey"}
            ${className || ""}`}
          {...props}
        />

        {isPassword && isEnabledIcon && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors text-text-muted hover:text-primary"
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        )}
      </div>

      <p className={`text-xs h-4 flex items-center ${error ? "text-danger" : ""}`}>
        {error ? error : "\u00A0"}
      </p>
    </div>
  );
};

export default Input;
