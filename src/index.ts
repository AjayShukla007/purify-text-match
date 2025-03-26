import { sanitizeString } from './sanitizer';
import { matchString } from './matcher';

export function processString(input: string, matchArray?: string[]): string {
    const sanitized = sanitizeString(input);

    if (matchArray && matchArray.length > 0) {
        const isMatched = matchString(sanitized, matchArray);
        if (isMatched) {
            return sanitized;
        } else {
            throw new Error('No match found in the provided array.');
        }
    }

    return sanitized;
}