export interface SanitizeOptions {
    removeSpecialChars?: boolean;
    toLowerCase?: boolean;
}

export interface MatchResult {
    matched: boolean;
    sanitizedString: string;
}