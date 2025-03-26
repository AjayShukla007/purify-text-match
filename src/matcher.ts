/**
 * Matches a sanitized string against an array of acceptable strings
 * Uses case-insensitive comparison for reliability
 * 
 * @param sanitized - The sanitized string to check
 * @param matchArray - Array of strings to match against
 * @returns boolean indicating whether a match was found
 */
export function matchString(sanitized: string, matchArray: string[]): boolean {
  if (!sanitized || !matchArray || !Array.isArray(matchArray) || matchArray.length === 0) {
    return false;
  }

  // Sanitize each string in the match array for consistent comparison
  const sanitizedMatches = matchArray.map(match => 
    match.toString().toUpperCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '').trim()
  );
  
  // Use Set for faster lookups with large arrays
  const matchSet = new Set(sanitizedMatches);
  
  return matchSet.has(sanitized);
}