/**
 * Format a number as Vietnamese Dong currency.
 * Example: 280000 → "280.000 ₫"
 */
export function formatVND(amount: number): string {
  return (
    new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' ₫'
  );
}

/**
 * Format a date string to a human-readable Vietnamese-style date.
 * Example: "2024-01-15" → "15/01/2024"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Format a date to a readable English format.
 * Example: "2024-01-15" → "January 15, 2024"
 */
export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Calculate discount percentage between original and sale price.
 */
export function calcDiscountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Truncate text to a given character limit with ellipsis.
 */
export function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + '…';
}
