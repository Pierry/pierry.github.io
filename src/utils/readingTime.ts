// Utility to estimate reading time like Medium does
export function estimateReadingTime(content: any): number {
  if (!content || !content.categories) return 1;
  
  let wordCount = 0;
  
  // Count words in all categories and tools
  Object.entries(content.categories).forEach(([category, tools]) => {
    // Add words from category name
    wordCount += category.split(' ').length;
    
    // Add words from each tool
    (tools as any[]).forEach(tool => {
      wordCount += tool.name.split(' ').length;
      wordCount += tool.description.split(' ').length;
    });
  });
  
  // Average reading speed is ~200-250 words per minute
  // Medium uses ~200 WPM for their calculations
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, readingTime); // Minimum 1 minute
}

// Estimate from plain markdown string (roughly Medium-style)
export function estimateReadingTimeFromMarkdown(markdown: string): number {
  if (!markdown) return 1;
  const text = markdown
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ') // inline/code fences
    .replace(/\[.*?\]\(.*?\)/g, ' ') // links
    .replace(/[#>*_\-]+/g, ' ') // md syntax chars
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(' ').filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}