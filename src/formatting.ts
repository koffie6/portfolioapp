// src/formatting.ts

/**
 * Format a number as currency:
 * - R prefix
 * - Space for thousands
 * - Dot for decimals
 * - Always two decimals (e.g. .00 for whole numbers)
 */
export function formatCurrency(amount: number): string {
  return (
    "R " +
    amount
      .toFixed(2) // always 2 decimals
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") // space for thousands
  );
}

/**
 * Format shares count:
 * - Space for thousands
 * - Append " shares"
 */
export function formatShares(shares: number): string {
  return shares.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " shares";
}