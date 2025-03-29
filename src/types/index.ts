/**
 * Type definitions for purify-text-match
 */

/**
 * Options for string processing
 */
export interface ProcessOptions {
  /**
   * Whether to throw an error on no match
   * @default true
   */
  throwOnNoMatch?: boolean;
  
  /**
   * Custom error message when no match is found
   */
  errorMessage?: string;
  
  /**
   * Whether to use strict matching (exact match with case sensitivity)
   * When true, skips sanitization and requires exact matches
   * @default true
   */
  strictMatching?: boolean;
  
  /**
   * Sanitization options to apply
   */
  sanitizeOptions?: SanitizeOptions;
  
  /**
   * Matching options to apply
   */
  matchOptions?: MatchOptions;

  /**
   * Remove special characters like @, #, $, etc.
   * @default true
   */
  removeSpecialChars?: boolean;
  
  /**
   * Convert the string to uppercase
   * @default false
   */
  convertToUpperCase?: boolean;
  
  /**
   * Remove all whitespace characters
   * @default false
   */
  removeWhitespace?: boolean;
  
  /**
   * Keep numeric digits during special character removal
   * @default true
   */
  preserveNumbers?: boolean;
  
  /**
   * Trim whitespace from beginning and end
   * @default true
   */
  trimEdges?: boolean;

  /**
   * Preserve the original case of characters
   * @default true
   */
  preserveCase?: boolean;

  /**
   * Preserve spaces in the text
   * @default true
   */
  preserveSpaces?: boolean;

  /**
   * Preserve hyphens in the text
   * @default false
   */
  preserveHyphens?: boolean;

  /**
   * Preserve underscores in the text
   * @default false
   */
  preserveUnderscores?: boolean;
}

/**
 * Result of the string processing operation
 */
export interface ProcessResult {
  /**
   * The sanitized string
   */
  sanitized: string;
  
  /**
   * Whether the string matched any items in the match array
   */
  matched: boolean;
  
  /**
   * Original input string
   */
  original?: string;
  
  /**
   * Matched string from the array (if any)
   */
  matchedWith?: string;
}

/**
 * Options for string sanitization
 */
export interface SanitizeOptions {
  /**
   * Remove special characters like @, #, $, etc.
   * @default true
   */
  removeSpecialChars?: boolean;
  
  /**
   * Convert the string to uppercase
   * @default false
   */
  convertToUpperCase?: boolean;
  
  /**
   * Remove all whitespace characters
   * @default false
   */
  removeWhitespace?: boolean;
  
  /**
   * Keep numeric digits during special character removal
   * @default true
   */
  preserveNumbers?: boolean;
  
  /**
   * Trim whitespace from beginning and end
   * @default true
   */
  trimEdges?: boolean;

  /**
   * Preserve the original case of characters
   * @default true
   */
  preserveCase?: boolean;

  /**
   * Preserve spaces in the text
   * @default true
   */
  preserveSpaces?: boolean;

  /**
   * Preserve hyphens in the text
   * @default false
   */
  preserveHyphens?: boolean;

  /**
   * Preserve underscores in the text
   * @default false
   */
  preserveUnderscores?: boolean;
}

/**
 * Options for string matching
 */
export interface MatchOptions {
  /**
   * Whether to use fuzzy matching
   * @default false
   */
  fuzzyMatch?: boolean;
  
  /**
   * Whether matching is case-sensitive
   * @default false
   */
  caseSensitive?: boolean;
  
  /**
   * Whether to sanitize the input string before matching
   * @default true
   */
  sanitizeInput?: boolean;
  
  /**
   * Whether to use strict matching (exact match with case sensitivity)
   * When true, overrides caseSensitive to true and sanitizeInput to false
   * @default false
   */
  strictMatching?: boolean;
  
  /**
   * Maximum Levenshtein distance for fuzzy matching
   * 0 means exact match only
   * @default 0
   */
  maxLevenshteinDistance?: number;
  
  /**
   * Sanitization options to apply before matching
   */
  sanitizeOptions?: SanitizeOptions;
}
/* 
    @author: Ajay shukla
*/
export interface MatchResult {
    matched: boolean;
    sanitizedString: string;
}