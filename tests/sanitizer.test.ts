import { sanitizeString } from '../src/sanitizer';
import { matchString } from '../src/matcher';

describe('sanitizeString', () => {
    it('should sanitize a string by removing unwanted characters', () => {
        const input = 'NI%F_TY';
        const expectedOutput = 'NIFTY';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should handle empty strings', () => {
        const input = '';
        const expectedOutput = '';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });

    it('should handle strings with only unwanted characters', () => {
        const input = '!!!@@@###';
        const expectedOutput = '';
        expect(sanitizeString(input)).toBe(expectedOutput);
    });
});

describe('matchString', () => {
    it('should return true if the sanitized string matches an entry in the array', () => {
        const sanitized = 'NIFTY';
        const matches = ['NIFTY', 'BANKNIFTY'];
        expect(matchString(sanitized, matches)).toBe(true);
    });

    it('should return false if the sanitized string does not match any entry in the array', () => {
        const sanitized = 'NIFTY';
        const matches = ['BANKNIFTY', 'SENSEX'];
        expect(matchString(sanitized, matches)).toBe(false);
    });

    it('should return false if the matches array is empty', () => {
        const sanitized = 'NIFTY';
        const matches: string[] = [];
        expect(matchString(sanitized, matches)).toBe(false);
    });

    it('should return false for an empty sanitized string', () => {
        const sanitized = '';
        const matches = ['NIFTY'];
        expect(matchString(sanitized, matches)).toBe(false);
    });
});