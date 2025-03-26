import { sanitizeString } from './sanitizer';
import { matchString } from './matcher';
import { ProcessOptions, ProcessResult } from './types';

/**
 * Processes a string by sanitizing it and optionally matching against an array
 * 
 * @param input - The string to process
 * @param matchArray - Optional array of strings to match against
 * @param options - Processing options
 * @returns The sanitized string or throws error if no match found
 */
export function processString(input: string, matchArray?: string[], options?: ProcessOptions): string | null {
    if (!input) {
        throw new Error('Input string is required.');
    }

    const sanitized = sanitizeString(input);
    const opts = { throwOnNoMatch: true, ...options };

    if (matchArray && matchArray.length > 0) {
        const isMatched = matchString(sanitized, matchArray);
        if (isMatched) {
            return sanitized;
        } else {
            if (opts.throwOnNoMatch) {
                throw new Error('No match found in the provided array.');
            }
            return null;
        }
    }

    return sanitized;
}

/**
 * Advanced version that returns both the sanitized string and match status
 */
export function processStringAdvanced(input: string, matchArray?: string[]): ProcessResult {
    const sanitized = sanitizeString(input);
    let matched = true;

    if (matchArray && matchArray.length > 0) {
        matched = matchString(sanitized, matchArray);
    }

    return {
        sanitized,
        matched
    };
}

export { sanitizeString, matchString };
export * from './types';