/**
 * Format a number as Colombian Peso (COP)
 * Example: 1234567.89 -> "$1.234.567,89"
 */
export function formatToCOP(value: number | string): string {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) return "";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
    .format(numValue)
    .replace("COP", "")
    .trim();
}

/**
 * Parse a COP formatted string to a number
 * Example: "$1.234.567,89" -> 1234567.89
 */
export function parseFromCOP(formatted: string): number {
  // Remove currency symbol and whitespace
  const cleaned = formatted.replace(/[$\s]/g, "");

  // Replace dots (thousands separator) with nothing
  // Replace comma (decimal separator) with dot
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format a number with thousands separators (Colombian format)
 * Example: 1234567 -> "1.234.567"
 */
export function formatNumber(value: number | string): string {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) return "";

  return new Intl.NumberFormat("es-CO").format(numValue);
}
