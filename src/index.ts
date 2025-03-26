import { sanitizeString, memoizedSanitize } from './sanitizer';
import { matchString, batchProcessStrings } from './matcher';
import { 
  ProcessOptions, 
  ProcessResult, 
  SanitizeOptions, 
  MatchOptions 
} from './types';

/**
 * Processes a string by sanitizing it and optionally matching against an array
 * 
 * @param input - The string to process
 * @param matchArray - Optional array of strings to match against
 * @param options - Processing options
 * @returns The sanitized string or throws error if no match found
 */
export function processString(
  input: string, 
  matchArray?: string[], 
  options?: ProcessOptions
): string | null {
  if (!input) {
    throw new Error('Input string is required.');
  }

  const opts = { 
    throwOnNoMatch: true, 
    errorMessage: 'No match found in the provided array.',
    strictMatching: true,
    ...options 
  };

  const sanitized = sanitizeString(input, opts.sanitizeOptions);

  if (matchArray && matchArray.length > 0) {
    let isMatched;
    
    if (opts.strictMatching) {
      isMatched = matchArray.includes(input);
    } else {
      const alphanumericOnly = (str: string) => str.toString().toUpperCase().replace(/[^A-Z0-9]/g, '');
      const processedInput = alphanumericOnly(input);
      isMatched = matchArray.some(match => alphanumericOnly(match) === processedInput);
    }
    
    if (isMatched) {
      return sanitized;
    } else {
      if (opts.throwOnNoMatch) {
        throw new Error(opts.errorMessage);
      }
      return null;
    }
  }

  return sanitized;
}

/**
 * Advanced version that returns both the sanitized string and match status
 */
export function processStringAdvanced(
  input: string, 
  matchArray?: string[],
  options?: ProcessOptions
): ProcessResult {
  const opts = { 
    strictMatching: true,
    ...options 
  };
  
  const sanitized = sanitizeString(input, opts.sanitizeOptions);
  let matched = true;
  let matchedWith = undefined;

  if (matchArray && matchArray.length > 0) {
    matched = false;
    
    if (opts.strictMatching) {
      // In strict mode, match the original inputs directly
      for (const item of matchArray) {
        if (input === item) {
          matched = true;
          matchedWith = item;
          break;
        }
      }
    } else {
      // More aggressive sanitization for non-strict mode
      const sanitizedInput = sanitizeString(input, {
        convertToUpperCase: true,
        removeSpecialChars: true,
        removeWhitespace: true
      }).replace(/[^A-Z0-9]/gi, '');
      
      for (const item of matchArray) {
        const sanitizedItem = sanitizeString(item, {
          convertToUpperCase: true,
          removeSpecialChars: true,
          removeWhitespace: true
        }).replace(/[^A-Z0-9]/gi, '');
        
        if (sanitizedInput === sanitizedItem) {
          matched = true;
          matchedWith = item;
          break;
        }
      }
    }
  }

  return {
    sanitized,
    matched,
    original: input,
    matchedWith
  };
}

/**
 * Process multiple strings efficiently
 */
export function batchProcess(
  inputs: string[], 
  matchArray?: string[], 
  options?: ProcessOptions
): (string | null)[] {
  return inputs.map(input => processString(input, matchArray, options));
}

/**
 * Process multiple strings with detailed results
 */
export function batchProcessAdvanced(
  inputs: string[], 
  matchArray?: string[], 
  options?: ProcessOptions
): ProcessResult[] {
  return inputs.map(input => processStringAdvanced(input, matchArray, options));
}

export { 
  sanitizeString, 
  memoizedSanitize, 
  matchString, 
  batchProcessStrings 
};
/* 
    @author: Ajay shukla
*/
export * from './types';