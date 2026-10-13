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
  sm: "0rem",
  md: "0.25rem",
  lg: "0.5rem",
  xl: "0.75rem",
  pill: "0rem",
},

  buttons: {
  radius: "sm" as const,
},
};