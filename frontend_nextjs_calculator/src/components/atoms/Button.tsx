import React from "react";

type ButtonProps = {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "accent" | "operator" | "function";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  tabIndex?: number;
  type?: "button" | "submit" | "reset";
};

/**
 * PUBLIC_INTERFACE
 * Button atom component for calculator keys and actions.
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  disabled,
  tabIndex,
  type = "button",
}) => {
  // Tailwind color variants for different button types
  const baseStyles =
    "rounded-lg transition-colors font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent";
  const variants: Record<string, string> = {
    primary:
      "bg-zinc-900 text-zinc-200 hover:bg-zinc-800 active:bg-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600",
    secondary:
      "bg-zinc-700 text-zinc-200 hover:bg-zinc-600 active:bg-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900",
    accent:
      "bg-cyan-500 text-zinc-900 hover:bg-cyan-400 focus:ring-cyan-400 active:bg-cyan-600",
    operator:
      "bg-slate-800 text-accent hover:bg-slate-700 active:bg-slate-600 dark:bg-slate-700 dark:text-cyan-400",
    function:
      "bg-zinc-700 text-indigo-400 hover:bg-zinc-600 active:bg-zinc-800",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className} px-4 py-3 sm:px-8 sm:py-5 text-base sm:text-xl select-none`}
      onClick={onClick}
      aria-label={ariaLabel || label}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
