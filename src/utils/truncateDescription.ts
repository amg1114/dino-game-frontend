import truncate from 'truncate-html';

/**
 * Truncates a given description to a specified maximum length, optionally stripping HTML tags
 * and appending an ellipsis ("...") if the text exceeds the limit.
 *
 * @param description - The input string to be truncated.
 * @param maxLength - The maximum allowed length of the truncated string.
 * @returns The truncated string with optional ellipsis appended.
 */
export function truncateDescription(description: string, maxLength: number = 220): string {
  return truncate(description, {
    stripTags: true,
    length: maxLength,
    ellipsis: '...',
  });
}
