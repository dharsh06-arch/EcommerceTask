import React from "react";

const Button = React.forwardRef(
  (
    {
      children,
      type = "button",
      variant = "solid", // solid | outline | ghost
      color = "primary", // primary | secondary | danger | success
      size = "md", // sm | md | lg
      radius = "lg", // none | sm | md | lg | full
      icon: Icon,
      iconPosition = "left",
      isLoading = false,
      isDisabled = false,
      onClick,
      className = "",
      ...props
    },
    ref
  ) => {
    // Base
    const base = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70 shadow-md hover:shadow-xl active:scale-95";

    // Variant Styles (BLACK & GRAY)
const variants = {
  solid: {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
    danger: "bg-gray-900 text-white hover:bg-black",
    success: "bg-gray-600 text-white hover:bg-gray-700",
  },
  outline: {
    primary: "border-2 border-black text-black bg-white hover:bg-gray-100",
    secondary: "border-2 border-gray-600 text-gray-700 bg-white hover:bg-gray-100",
    danger: "border-2 border-gray-800 text-gray-800 bg-white hover:bg-gray-100",
    success: "border-2 border-gray-500 text-gray-700 bg-white hover:bg-gray-100",
  },
  ghost: {
    primary: "text-black hover:bg-gray-100",
    secondary: "text-gray-700 hover:bg-gray-100",
    danger: "text-gray-900 hover:bg-gray-200",
    success: "text-gray-600 hover:bg-gray-100",
  },
};

    // Size
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    // Radius
    const radii = {
      none: "rounded-none",
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-xl",
      full: "rounded-full",
    };

    // Icon Size
    const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24;

    const colorStyle = variants[variant][color] || variants.solid.primary;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        className={`
          ${base}
          ${colorStyle}
          ${sizes[size]}
          ${radii[radius]}
          ${className}
          cursor-pointer
          transition-all transform hover:-translate-y-1 active:scale-95
          relative overflow-hidden
        `}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <svg
              className="animate-spin"
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              />
            </svg>
            <span>{children}</span>
          </div>
        ) : (
          <span className="flex items-center gap-2">
            {Icon && iconPosition === "left" && <Icon size={iconSize} />}
            {children}
            {Icon && iconPosition === "right" && <Icon size={iconSize} />}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;