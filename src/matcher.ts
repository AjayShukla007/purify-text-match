export function matchString(sanitizedString: string, matchArray?: string[]): string | Error {
    if (matchArray) {
        const matched = matchArray.some(match => match.toLowerCase() === sanitizedString.toLowerCase());
        if (matched) {
            return sanitizedString;
        } else {
            return new Error('No match found for the sanitized string.');
        }
    }
    return sanitizedString;
}