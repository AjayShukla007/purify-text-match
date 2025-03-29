import { sanitizeString } from '../src/sanitizer';
import { matchString } from '../src/matcher';

describe('Sanitizer', () => {
  test('should remove special characters', () => {
    expect(sanitizeString('ORANGE%C_AT')).toBe('ORANGECAT');
    expect(sanitizeString('O@!#R&*^A-N+GE CAT')).toBe('ORANGE CAT');
  });

  test('should convert to uppercase', () => {
    expect(sanitizeString('orange cat')).toBe('orange cat');
    expect(sanitizeString('OrAnGe CaT')).toBe('OrAnGe CaT');
  });

  test('should remove whitespace', () => {
    expect(sanitizeString('O R A N G E C A T')).toBe('O R A N G E C A T');
    expect(sanitizeString('ORANGE CAT ')).toBe('ORANGE CAT');
  });

  test('should handle non-string inputs', () => {
    expect(sanitizeString(null)).toBe('');
    expect(sanitizeString(undefined)).toBe('');
    expect(sanitizeString(123 as any)).toBe('123');
  });
});

describe('sanitizeString', () => {
    it('should sanitize a string by removing unwanted characters', () => {
        const input = 'ORANGE%C_AT';
        const expectedOutput = 'ORANGECAT';
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
        const sanitized = 'ORANGECAT';
        const matches = ['ORANGECAT', 'BLACKCAT'];
        expect(matchString(sanitized, matches)).toBe(true);
    });

    it('should return false if the sanitized string does not match any entry in the array', () => {
        const sanitized = 'ORANGECAT';
        const matches = ['BLACKCAT', 'WHITECAT'];
        expect(matchString(sanitized, matches)).toBe(false);
    });

    it('should return false if the matches array is empty', () => {
        const sanitized = 'ORANGECAT';
        const matches: string[] = [];
        expect(matchString(sanitized, matches)).toBe(false);
    });

    it('should return false for an empty sanitized string', () => {
        const sanitized = '';
        const matches = ['ORANGECAT'];
        expect(matchString(sanitized, matches)).toBe(false);
    });
});