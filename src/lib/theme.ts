import { themeConfig } from "../config/theme";

export function getButtonRadiusClass() {
  const radius = themeConfig.buttons.radius;

  const radiusClasses = {
    sm: "rounded-[var(--theme-radius-sm)]",
    md: "rounded-[var(--theme-radius-md)]",
    lg: "rounded-[var(--theme-radius-lg)]",
    pill: "rounded-[var(--theme-radius-pill)]",
  };

  return radiusClasses[radius];
}