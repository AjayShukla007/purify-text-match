import { log } from 'console';
import { sanitizeString, memoizedSanitize } from './sanitizer';
import { MatchOptions } from './types';

/**
 * Enhanced matching function with advanced features
 * 
 * @param input - String to match
 * @param matchArray - Array of strings to match against
 * @param options - Matching options
 * @returns Boolean indicating whether match was found
 */
export function matchString(
  input: string, 
  matchArray: string[] | null | undefined,
  options?: MatchOptions
): boolean {
  if (!input || !matchArray || !Array.isArray(matchArray) || matchArray.length === 0) {
    return false;
  }
  // Handle strictMatching option with true as default
  const strictMode = options?.strictMatching !== false;
  
  if (strictMode) {
    return matchArray.includes(input);
  }
  
  // For non-strict mode, use the proper sanitization function
  // Create consistent sanitization options
  const sanitizeOptions = {
    convertToUpperCase: true,
    removeSpecialChars: true,
    removeWhitespace: true
  };
  
  // Use the proper sanitizeString function from sanitizer.ts
  const sanitizedInput = sanitizeString(input, sanitizeOptions);
  
  // Check each match using the same sanitization function
  return matchArray.some(match => {
    const sanitizedMatch = sanitizeString(match, sanitizeOptions);
    // DEBUG:
    // console.log(`Sanitized Input: ${sanitizedInput}, Sanitized Match: ${sanitizedMatch}`);
    return sanitizedMatch === sanitizedInput;
  });
}

/**
 * Calculate Levenshtein distance between two strings
 * For fuzzy matching capability
 */
function levenshteinDistance(a: string, b: string): number {
  // Protect against extremely large strings
  const MAX_STRING_LENGTH = 1000;
  if (a.length > MAX_STRING_LENGTH || b.length > MAX_STRING_LENGTH) {
    throw new Error('String too large for fuzzy matching');
  }
  
  const matrix = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Efficiently process arrays of strings
 */
/* 
    @author: Ajay shukla
*/
export function batchProcessStrings(
  inputs: string[], 
  matchArray: string[], 
  options?: MatchOptions
): boolean[] {
  return inputs.map(input => matchString(input, matchArray, options));
}