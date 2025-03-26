/**
 * Sanitizes a string by:
 * - Removing special characters and symbols
 * - Converting to uppercase for consistency
 * - Removing extra spaces
 * 
 * @param input - The string to sanitize
 * @returns The sanitized string
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .toString()
    .toUpperCase()
    .replace(/[^\w\s]/gi, '') // Remove special characters
    .replace(/\s+/g, '')      // Remove all whitespace
    .trim();
}