/**
 * Generates a unique ID for a cart line.
 *
 * Uses crypto.randomUUID() when available.
 * Falls back to a timestamp + random string for
 * older environments.
 */
export function createCartLineId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `line_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 11)}`;
}

/**
 * Compare two variant objects.
 */
export function variantsAreEqual(
  first?: Record<string, string>,
  second?: Record<string, string>
): boolean {
  return (
    JSON.stringify(first ?? {}) ===
    JSON.stringify(second ?? {})
  );
}