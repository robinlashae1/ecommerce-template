export const themeConfig = {
  colors: {
    primary: "#7c3aed",
primaryHover: "#6d28d9",

    background: "#ffffff",
    surface: "#f7f7f7",

    text: "#080808",
    textMuted: "#6b7280",

    border: "#e5e7eb",

    success: "#15803d",
    danger: "#dc2626",
    warning: "#a16207",
  },

  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    pill: "9999px",
  },

  buttons: {
    radius: "pill" as const,
  },
};