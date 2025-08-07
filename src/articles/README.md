# Articles System

This folder contains all blog articles. Each article is a TypeScript file that exports article data.

## How to Add a New Article

1. **Create a new file** in the `src/articles` folder with the format: `article-slug.ts`

2. **Use this template**:
```typescript
export const myNewArticle = {
  title: "Your Article Title",
  description: "Brief description of your article",
  slug: "your-article-slug",
  createdAt: "2025-08-07", // YYYY-MM-DD format
  content: {
    // Your article content goes here
    // Can be any structure you need
  }
};
```

3. **Add the article to the index**:
   - Open `src/articles/index.ts`
   - Import your article: `import { myNewArticle } from './your-article-slug';`
   - Add it to the articles array: `export const articles: Article[] = [myNewArticle, ...otherArticles];`

4. **Article dates are automatic**: The `createdAt` field will be automatically formatted and displayed

## Current Articles

- **AI Tools Catalog (2025)**: A simplified catalog of essential AI tools with "Tested" badges for personally validated tools

## Features

- **Automatic date formatting**: Articles show "Month Year" format automatically
- **Dynamic rendering**: Articles are rendered based on their content structure
- **Easy maintenance**: Just add a new file and update the index
- **Tested badges**: Add `tested: true` to any tool to show a green "Tested" badge