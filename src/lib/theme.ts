
import { themeConfig } from "../config/theme";

type ButtonRadius = "sm" | "md" | "lg" | "pill";

const radiusClasses: Record<ButtonRadius, string> = {
  sm: "rounded-[var(--theme-radius-sm)]",
  md: "rounded-[var(--theme-radius-md)]",
  lg: "rounded-[var(--theme-radius-lg)]",
  pill: "rounded-[var(--theme-radius-pill)]",
};

export function getButtonRadiusClass(): string {
  return radiusClasses[themeConfig.buttons.radius];
}