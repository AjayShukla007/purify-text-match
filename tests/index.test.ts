import { processString, processStringAdvanced } from '../src/index';

describe('processString', () => {
  test('should use strict matching by default', () => {
    // Exact match should work
    expect(processString('ORANGECAT', ['ORANGECAT'])).toBe('ORANGECAT');
    
    // Different case should not match by default (strict mode)
    expect(() => {
      processString('ORANGECAT', ['orangecat']);
    }).toThrow('No match found in the provided array.');
    
    // Special characters should not be sanitized by default (strict mode)
    expect(() => {
      processString('ORANGECAT', ['ORANGE CAT']);
    }).toThrow('No match found in the provided array.');
  });
  
  test('should sanitize and match when strictMatching is false', () => {
    // Different case should match with strictMatching: false
    expect(processString('ORANGECAT', ['orangecat'], { strictMatching: false })).toBe('ORANGECAT');
    
    // Special characters should be sanitized with strictMatching: false
    expect(processString('ORANGECAT', ['ORANGE CAT'], { strictMatching: false })).toBe('ORANGECAT');
    
    // Update test for proper special character handling
    // O@RANGE-C@T! should not match ORANGECAT when sanitized properly
    expect(() => {
      processString('ORANGECAT', ['O@RANGE-C@T!'], { strictMatching: false });
    }).toThrow('No match found in the provided array.');
    
    // This test shows the non-throwing version
    expect(processString('ORANGECAT', ['O@RANGE-C@T!'], { 
      strictMatching: false,
      throwOnNoMatch: false 
    })).toBeNull();
    
    // Add test for correct special character handling
    expect(processString('ORANGECAT', ['ORANGE@CAT'], { strictMatching: false })).toBe('ORANGECAT');
  });
  
  test('should return null instead of throwing with throwOnNoMatch: false', () => {
    expect(processString('ORANGECAT', ['BLACKCAT'], { 
      throwOnNoMatch: false 
    })).toBeNull();
  });
  
  test('should sanitize string when no match array provided', () => {
    expect(processString('ORANGE CAT')).toBe('ORANGECAT');
    expect(processString('orange-cat')).toBe('ORANGECAT');
  });
});

describe('processStringAdvanced', () => {
  test('should provide detailed matching information', () => {
    const result = processStringAdvanced('ORANGECAT', ['ORANGECAT', 'BLACKCAT']);
    expect(result).toEqual({
      sanitized: 'ORANGECAT',
      matched: true,
      original: 'ORANGECAT',
      matchedWith: 'ORANGECAT'
    });
  });
  
  test('should handle non-matching inputs with strictMatching', () => {
    const result = processStringAdvanced('ORANGECAT', ['orangecat', 'BLACKCAT']);
    expect(result.matched).toBe(false);
  });
  
  test('should match with sanitization when strictMatching is false', () => {
    const result = processStringAdvanced('ORANGE-CAT', ['orangecat'], { strictMatching: false });
    expect(result.matched).toBe(true);
    expect(result.matchedWith).toBe('orangecat');
  });
});