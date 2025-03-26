import { 
  matchString, 
  processString, 
  processStringAdvanced, 
  batchProcess, 
  batchProcessAdvanced,
  sanitizeString,
  memoizedSanitize
} from '../src/index';

describe('Comprehensive Tests for All Functions', () => {
  // Common test values
  const testCases = [
    { input: 'ORANGECAT', matches: ['ORANGECAT', 'BLACKCAT'], shouldMatch: true },
    { input: 'orange-cat', matches: ['ORANGECAT'], shouldMatch: true, strictShouldMatch: false },
    { input: 'O@R#A$N%G^E&C*A(T)', matches: ['ORANGECAT'], shouldMatch: true, strictShouldMatch: false },
    { input: 'O@RANGE-C@T!', matches: ['ORANGECAT'], shouldMatch: false, strictShouldMatch: false },
    { input: 'YELLOWCAT', matches: ['ORANGECAT', 'BLACKCAT'], shouldMatch: false }
  ];

  describe('matchString function', () => {
    test('handles various special character and casing scenarios', () => {
      // Test each case with both strict and non-strict matching
      testCases.forEach(tc => {
        expect(matchString(tc.input, tc.matches)).toBe(tc.strictShouldMatch ?? tc.shouldMatch);
        expect(matchString(tc.input, tc.matches, { strictMatching: false })).toBe(tc.shouldMatch);
      });
    });
    
    test('handles edge cases correctly', () => {
      expect(matchString('', ['SOMETHING'])).toBe(false);
      expect(matchString('SOMETHING', [])).toBe(false);
      expect(matchString('SOMETHING', null)).toBe(false);
      expect(matchString('SOMETHING', undefined)).toBe(false);
    });
  });

  describe('processString function', () => {
    test('returns sanitized string when matched', () => {
      expect(processString('ORANGECAT', ['ORANGECAT'])).toBe('ORANGECAT');
      expect(processString('orange cat', ['ORANGECAT'], { strictMatching: false })).toBe('ORANGECAT');
    });
    
    test('throws on no match by default', () => {
      expect(() => {
        processString('ORANGECAT', ['BLACKCAT']);
      }).toThrow('No match found in the provided array.');
    });
    
    test('handles special characters correctly in non-strict mode', () => {
      expect(processString('O R A N G E-C A T', ['ORANGECAT'], { strictMatching: false })).toBe('ORANGECAT');
      expect(processString('ORANGE@CAT', ['ORANGECAT'], { strictMatching: false })).toBe('ORANGECAT');
      
      expect(() => {
        processString('ORANGECAT', ['O@RANGE-C@T!'], { strictMatching: false });
      }).toThrow('No match found in the provided array.');
    });
    
    test('returns null instead of throwing with throwOnNoMatch: false', () => {
      expect(processString('ORANGECAT', ['BLACKCAT'], { 
        throwOnNoMatch: false 
      })).toBeNull();
    });
    
    test('works with custom error message', () => {
      expect(() => {
        processString('ORANGECAT', ['BLACKCAT'], { 
          errorMessage: 'Custom error message' 
        });
      }).toThrow('Custom error message');
    });
  });

  describe('processStringAdvanced function', () => {
    test('returns complete result object with matching info', () => {
      const result = processStringAdvanced('ORANGECAT', ['ORANGECAT']);
      expect(result).toEqual({
        sanitized: 'ORANGECAT',
        matched: true,
        original: 'ORANGECAT',
        matchedWith: 'ORANGECAT'
      });
    });
    
    test('returns non-matched result when appropriate', () => {
      const result = processStringAdvanced('ORANGECAT', ['BLACKCAT']);
      expect(result).toEqual({
        sanitized: 'ORANGECAT',
        matched: false,
        original: 'ORANGECAT',
        matchedWith: undefined
      });
    });
    
    test('handles special characters and casing correctly', () => {
      const result = processStringAdvanced('orange-cat', ['ORANGECAT'], { strictMatching: false });
      expect(result.matched).toBe(true);
      expect(result.matchedWith).toBe('ORANGECAT');
    });
    
    test('correctly reports no match for "O@RANGE-C@T!"', () => {
      const result = processStringAdvanced('ORANGECAT', ['O@RANGE-C@T!'], { strictMatching: false });
      expect(result.matched).toBe(false);
    });
    
    test('works without a match array', () => {
      const result = processStringAdvanced('ORANGE CAT');
      expect(result).toEqual({
        sanitized: 'ORANGECAT',
        matched: true,
        original: 'ORANGE CAT',
        matchedWith: undefined
      });
    });
  });

  describe('Batch processing functions', () => {
    const inputs = ['ORANGECAT', 'orange-cat', 'BLACKCAT', 'YELLOWCAT'];
    const matchArray = ['ORANGECAT', 'BLACKCAT'];
    
    test('batchProcess handles array of inputs correctly', () => {
      // Add throwOnNoMatch: false to prevent errors for non-matches
      const strictResults = batchProcess(inputs, matchArray, { 
        throwOnNoMatch: false 
      });
      expect(strictResults).toEqual(['ORANGECAT', null, 'BLACKCAT', null]);
      
      const nonStrictResults = batchProcess(inputs, matchArray, { 
        strictMatching: false, 
        throwOnNoMatch: false 
      });
      expect(nonStrictResults).toEqual(['ORANGECAT', 'ORANGECAT', 'BLACKCAT', null]);
    });
    
    test('batchProcessAdvanced returns detailed results', () => {
      const results = batchProcessAdvanced(inputs, matchArray, { 
        strictMatching: false
      });
      
      expect(results).toHaveLength(4);
      expect(results[0].matched).toBe(true);
      expect(results[1].matched).toBe(true);
      expect(results[2].matched).toBe(true);
      expect(results[3].matched).toBe(false);
    });
  });

  describe('Sanitization functions', () => {
    test('sanitizeString handles different options correctly', () => {
      expect(sanitizeString('ORANGE-CAT!')).toBe('ORANGECAT');
      
      expect(sanitizeString('orange-cat', { convertToUpperCase: true })).toBe('ORANGECAT');
      
      expect(sanitizeString('orange-cat', { convertToUpperCase: false })).toBe('orangecat');
      
      expect(sanitizeString('orange cat', { 
        convertToUpperCase: true,
        removeWhitespace: true
      })).toBe('ORANGECAT');
      
      expect(sanitizeString('orange-cat', {
        convertToUpperCase: false,
        removeSpecialChars: false
      })).toBe('orange-cat');
    });
    
    test('memoizedSanitize caches results correctly', () => {
      const input = 'ORANGE-CAT';
      
      // First call should compute
      const result1 = memoizedSanitize(input);
      expect(result1).toBe('ORANGECAT');
      
      // Mock sanitizeString to verify it's not called again
      const originalSanitize = require('../src/sanitizer').sanitizeString;
      const mockSanitize = jest.fn(() => 'SHOULD NOT RETURN THIS');
      require('../src/sanitizer').sanitizeString = mockSanitize;
      
      // Second call should use cached value
      const result2 = memoizedSanitize(input);
      expect(result2).toBe('ORANGECAT');
      expect(mockSanitize).not.toHaveBeenCalled();
      
      // Restore original function
      require('../src/sanitizer').sanitizeString = originalSanitize;
    });
  });
});