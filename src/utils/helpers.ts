/**
 * Generate an array of star values for a given rating.
 * Returns an array of 5 elements: 'full' | 'half' | 'empty'
 */
export function getStarValues(rating: number): Array<'full' | 'half' | 'empty'> {
  const stars: Array<'full' | 'half' | 'empty'> = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push('full');
    } else if (rating >= i - 0.5) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  return stars;
}

/**
 * Generate a unique ID string.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Slugify a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a badge key to its label and color classes.
 */
export function getBadgeInfo(badge: 'new' | 'sale' | 'bestseller' | 'limited' | undefined): {
  label: string;
  classes: string;
} | null {
  switch (badge) {
    case 'new':
      return { label: 'Mới', classes: 'bg-blue-500 text-white' };
    case 'sale':
      return { label: 'Giảm giá', classes: 'bg-red-500 text-white' };
    case 'bestseller':
      return { label: 'Bán chạy', classes: 'bg-amber-500 text-white' };
    case 'limited':
      return { label: 'Có hạn', classes: 'bg-purple-600 text-white' };
    default:
      return null;
  }
}

/**
 * Check if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
