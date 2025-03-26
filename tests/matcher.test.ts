import { matchString } from '../src/matcher';

describe('matchString', () => {
    test('should return true for a matching sanitized string', () => {
        const sanitizedString = 'NIFTY';
        const matchArray = ['NIFTY', 'BANKNIFTY'];
        const result = matchString(sanitizedString, matchArray);
        expect(result).toBe(true);
    });

    test('should return false for a non-matching sanitized string', () => {
        const sanitizedString = 'NIFTY';
        const matchArray = ['BANKNIFTY', 'SENSEX'];
        const result = matchString(sanitizedString, matchArray);
        expect(result).toBe(false);
    });

    test('should return false when no match array is provided', () => {
        const sanitizedString = 'NIFTY';
        const result = matchString(sanitizedString);
        expect(result).toBe(false);
    });

    test('should handle empty match array', () => {
        const sanitizedString = 'NIFTY';
        const matchArray: string[] = [];
        const result = matchString(sanitizedString, matchArray);
        expect(result).toBe(false);
    });

    test('should return false for a sanitized string that does not match', () => {
        const sanitizedString = 'NIFTY';
        const matchArray = ['NIFTY50'];
        const result = matchString(sanitizedString, matchArray);
        expect(result).toBe(false);
    });
});