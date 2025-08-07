import { aiToolsCatalog2025 } from './ai-tools-catalog-2025';

export interface Article {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  content: any;
}

// Export all articles here
export const articles: Article[] = [
  aiToolsCatalog2025,
];

export { aiToolsCatalog2025 };