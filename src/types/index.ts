/**
 * Type definitions for purify-text-match
 */

/**
 * Options for string processing
 */
export interface ProcessOptions {
  /**
   * Whether to throw an error on no match (default: true)
   * If false, returns null on no match instead
   */
  throwOnNoMatch?: boolean;
  
  /**
   * Case sensitivity for matching
   * Default is false (case insensitive)
   */
  caseSensitive?: boolean;
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
}

export interface SanitizeOptions {
    removeSpecialChars?: boolean;
    toLowerCase?: boolean;
}

export interface MatchResult {
    matched: boolean;
    sanitizedString: string;
}