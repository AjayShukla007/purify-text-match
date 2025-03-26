import { matchString } from '../src/matcher';

describe('Matcher', () => {
  // These tests now need strictMatching: false to match the old behavior
  test('should match sanitized strings correctly when sanitization is enabled', () => {
    expect(matchString('ORANGECAT', ['ORANGECAT', 'BLACKCAT'], { strictMatching: false })).toBe(true);
    expect(matchString('ORANGECAT', ['BLACKCAT', 'WHITECAT'], { strictMatching: false })).toBe(false);
  });

  test('should be case insensitive for match array when sanitization is enabled', () => {
    expect(matchString('ORANGECAT', ['orangecat', 'whitecat'], { strictMatching: false })).toBe(true);
    expect(matchString('ORANGECAT', ['OrAnGeCaT'], { strictMatching: false })).toBe(true);
  });

  test('should sanitize match array values when sanitization is enabled', () => {
    expect(matchString('ORANGECAT', ['ORANGE%C_AT', 'WHITECAT'], { strictMatching: false })).toBe(true);
    expect(matchString('ORANGECAT', ['O R A N G E C A T'], { strictMatching: false })).toBe(true);
  });

  test('should handle edge cases regardless of strict mode', () => {
    expect(matchString('', [])).toBe(false);
    expect(matchString('ORANGECAT', null)).toBe(false);
    expect(matchString('ORANGECAT', undefined)).toBe(false);
  });
  
  // Add tests for default strict behavior
  test('should use strict matching by default (case sensitive, no sanitization)', () => {
    // Exact matches should work
    expect(matchString('ORANGECAT', ['ORANGECAT'])).toBe(true);
    
    // Different case should not match in strict mode
    expect(matchString('ORANGECAT', ['orangecat'])).toBe(false);
    
    // Special characters and spaces should not be sanitized in strict mode
    expect(matchString('ORANGECAT', ['ORANGE CAT'])).toBe(false);
    expect(matchString('ORANGECAT', ['ORANGE%C_AT'])).toBe(false);
  });
});

describe('Advanced matching', () => {
  test('should handle complex sanitization cases', () => {
    // With the new default strictMatching: true, these should be false
    expect(matchString('ORANGECAT', ['O@RANGE-C@T!'])).toBe(false);
    expect(matchString('ORANGECAT', ['orange-CAT'])).toBe(false);
    
    // But with strictMatching: false, the sanitized versions should match
    expect(matchString('ORANGECAT', ['O@RANGE-C@T!'], { strictMatching: false })).toBe(false);
    expect(matchString('ORANGECAT', ['orange-CAT'], { strictMatching: false })).toBe(true);
  });

  test('should handle empty strings', () => {
    expect(matchString('', ['ORANGECAT'])).toBe(false);
    expect(matchString('ORANGECAT', [])).toBe(false);
  });

  test('should match correctly with arrays containing multiple items', () => {
    const testArray = ['BLACKCAT', 'ORANGECAT', 'WHITECAT'];
    
    // Exact match should work in strict mode
    expect(matchString('ORANGECAT', testArray)).toBe(true);
    expect(matchString('YELLOWCAT', testArray)).toBe(false);
    
    // With strictMatching false, sanitized versions should match
    expect(matchString('orange cat', testArray, { strictMatching: false })).toBe(true);
  });

  test('should respect strictMatching option explicitly set', () => {
    // With strictMatching = true (now the default)
    expect(matchString('ORANGECAT', ['ORANGECAT'], { strictMatching: true })).toBe(true);
    expect(matchString('ORANGECAT', ['orangecat'], { strictMatching: true })).toBe(false);
    expect(matchString('ORANGECAT', ['ORANGE CAT'], { strictMatching: true })).toBe(false);
    expect(matchString('ORANGECAT', ['O@RANGE-C@T!'], { strictMatching: true })).toBe(false);
    
    // With strictMatching = false (now needs to be explicitly set)
    expect(matchString('ORANGECAT', ['orangecat'], { strictMatching: false })).toBe(true);
    expect(matchString('ORANGECAT', ['ORANGE CAT'], { strictMatching: false })).toBe(true);
  });

  test('strictMatching should override other options', () => {
    // Should be case sensitive even if caseSensitive is false
    expect(matchString('ORANGECAT', ['orangecat'], { 
      strictMatching: true,
      caseSensitive: false 
    })).toBe(false);
    
    // Should not sanitize even if sanitizeInput is true
    expect(matchString('ORANGECAT', ['ORANGE CAT'], { 
      strictMatching: true,
      sanitizeInput: true 
    })).toBe(false);
  });
});