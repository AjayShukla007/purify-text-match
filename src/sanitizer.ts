import { SanitizeOptions } from './types';

const DEFAULT_OPTIONS: SanitizeOptions = {
  removeSpecialChars: true,
  convertToUpperCase: true,
  removeWhitespace: true,
  preserveNumbers: true,
  trimEdges: true
};

/**
 * Enhanced sanitizer with configurable options
 * 
 * @param input - String to sanitize
 * @param options - Sanitization options
 * @returns Sanitized string
 */
export function sanitizeString(
  input: string | null | undefined,
  options?: Partial<SanitizeOptions>
): string {
  if (input === null || input === undefined) return '';
  
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let result = input.toString();
  
  // Apply transformations based on options
  if (opts.convertToUpperCase) {
    result = result.toUpperCase();
  }
  
  if (opts.removeSpecialChars) {
    // Updated regex pattern to consider underscore as a special character
    const pattern = opts.preserveNumbers ? /[^\w\d\s]|_/gi : /[^\w\s]|_/gi;
    result = result.replace(pattern, '');
  }
  
  if (opts.removeWhitespace) {
    result = result.replace(/\s+/g, '');
  }
  
  if (opts.trimEdges) {
    result = result.trim();
  }
  
  return result;
}

// Cache for memoized sanitization results
const sanitizationCache = new Map<string, string>();

/**
 * Memoized version of sanitizeString for repeated operations
 */
export function memoizedSanitize(input: string, options?: SanitizeOptions): string {
  if (!input) return '';
  
  // Create cache key from input and options
  const optionsKey = options ? JSON.stringify(options) : 'default';
  const cacheKey = `${input}:${optionsKey}`;
  
  if (sanitizationCache.has(cacheKey)) {
    // Fix: Add non-null assertion operator or type handling
    const cached = sanitizationCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
  }
  
  const result = sanitizeString(input, options);
  
  // Only cache if the cache isn't too large (this will prevent memory leaks)
  if (sanitizationCache.size < 10000) {
    sanitizationCache.set(cacheKey, result);
  }
  
  return result;
}
/* 
    @author: Ajay shukla
*/
// Need to add size limit with LRU behavior
// adding cache clearing method for simple testing
export function clearSanitizationCache(): void {
  sanitizationCache.clear();
}