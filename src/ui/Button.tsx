import type { ButtonHTMLAttributes } from "react";

import { themeConfig } from "../config/theme";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--theme-primary)] text-white hover:bg-[var(--theme-primary-hover)]",

    secondary:
      "bg-[var(--theme-surface)] text-[var(--theme-text)] hover:brightness-95",

    outline:
      "border border-[var(--theme-border)] bg-transparent text-[var(--theme-text)] hover:bg-[var(--theme-surface)]",

    ghost:
      "bg-transparent text-[var(--theme-text)] hover:bg-[var(--theme-surface)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  const radius = {
    sm: "rounded-[var(--theme-radius-sm)]",
    md: "rounded-[var(--theme-radius-md)]",
    lg: "rounded-[var(--theme-radius-lg)]",
    pill: "rounded-[var(--theme-radius-pill)]",
  };

  return (
    <button
      className={[
        "inline-flex items-center justify-center font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        radius[themeConfig.buttons.radius],
        variants[variant],
        sizes[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}