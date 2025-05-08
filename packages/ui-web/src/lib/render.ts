/**
 * Extracts initials from a person's full name
 * Examples:
 * - "John Doe" => "JD"
 * - "Jane Smith Johnson" => "JSJ"
 * - "Alice" => "A"
 */
export const getIntials = (name?: string | null): string => {
  if (!name) return '';
  
  return name
    .split(' ')
    .filter(part => part.length > 0)
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

/**
 * Truncates text to a specific length and adds ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Formats a date in a human-readable form
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};