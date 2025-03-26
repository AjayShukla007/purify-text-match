export function sanitizeString(input: string): string {
    // Remove unwanted characters (e.g., special characters, whitespace)
    return input.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}