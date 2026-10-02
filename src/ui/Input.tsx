import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
  "w-full bg-[var(--theme-background)] px-4 py-3 text-sm outline-none transition-colors",
  "placeholder:text-gray-400",
  "focus:border-[var(--theme-primary)] focus:ring-1 focus:ring-[var(--theme-primary)]",
  "disabled:cursor-not-allowed disabled:bg-[var(--theme-surface)] disabled:text-gray-500",
  error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "border-[var(--theme-border)]",
  "rounded-[var(--theme-radius-md)]",
  className,
]
  .filter(Boolean)
  .join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error
            ? `${id}-error`
            : helperText
              ? `${id}-helper`
              : undefined
        }
        {...props}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${id}-helper`}
          className="mt-2 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}