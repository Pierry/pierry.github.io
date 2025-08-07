export interface Article {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  content?: any;
  markdown?: string;
}

// Load all markdown files placed under src/articles/*.md at build time
// File name (without extension) becomes the slug
const markdownModules = import.meta.glob('./*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

const markdownArticles: Article[] = Object.entries(markdownModules).map(([path, raw]) => {
  const fileName = path.split('/').pop() || '';
  const slug = fileName.replace(/\.md$/, '');

  // Simple frontmatter-like extraction for title/description (optional)
  // Expect optional first lines like: # Title  \n > Description
  let title = slug.replace(/[-_]/g, ' ');
  let description = '';
  const lines = raw.trim().split('\n');
  if (lines[0]?.startsWith('# ')) {
    title = lines[0].replace(/^#\s+/, '').trim();
  }
  if (lines[1]?.startsWith('>')) {
    description = lines[1].replace(/^>\s*/, '').trim();
  }

  // Fallback: use first non-empty paragraph as description (skip headings, lists, code fences)
  if (!description) {
    let inFence = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^```/.test(line)) {
        inFence = !inFence;
        continue;
      }
      if (inFence) continue;
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (/^(#|>|\-|\*|\d+\.)\s/.test(trimmed)) continue;
      description = trimmed.replace(/[`*_#>]/g, '').slice(0, 180);
      break;
    }
  }

  return {
    title,
    description,
    slug,
    createdAt: new Date().toISOString(),
    markdown: raw,
  };
});

// Export all articles: built-in typed ones and any .md dropped in the folder
export const articles: Article[] = [
  ...markdownArticles,
];