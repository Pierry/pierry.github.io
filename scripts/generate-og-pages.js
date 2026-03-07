#!/usr/bin/env node
/**
 * Generate static HTML pages for newsletter entries with proper OG tags
 * This enables proper link previews when sharing individual entries
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const dataPath = path.join(__dirname, '..', 'src', 'data', 'newsletters.json');

// Read newsletters data
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Read the base index.html
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Create newsletters directory in dist
const newslettersDir = path.join(distDir, 'newsletters');
if (!fs.existsSync(newslettersDir)) {
  fs.mkdirSync(newslettersDir, { recursive: true });
}

// Copy index.html to newsletters/index.html for the main page
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(newslettersDir, 'index.html'));

// Helper to escape HTML entities
const escapeHtml = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

// Generate a page for each entry
let generatedCount = 0;

data.digests.forEach(digest => {
  digest.entries.forEach(entry => {
    const entryId = `${digest.id}-${entry.rank}`;
    const title = escapeHtml(entry.title.pt || entry.title.en);
    const rawDescription = entry.summary.pt || entry.summary.en || '';
    const description = escapeHtml(rawDescription.slice(0, 200).replace(/\n/g, ' '));
    
    // Create custom OG tags for this entry
    const customHtml = indexHtml
      // Update title
      .replace(
        /<title>.*?<\/title>/,
        `<title>${title} | Pierry Borges</title>`
      )
      // Update meta description
      .replace(
        /<meta name="description" content="[^"]*"[^>]*\/>/,
        `<meta name="description" content="${description}..." />`
      )
      // Update OG tags
      .replace(
        /<meta property="og:title" content="[^"]*"[^>]*\/>/,
        `<meta property="og:title" content="${title}" />`
      )
      .replace(
        /<meta property="og:description" content="[^"]*"[^>]*\/>/,
        `<meta property="og:description" content="${description}..." />`
      )
      .replace(
        /<meta property="og:url" content="[^"]*"[^>]*\/>/,
        `<meta property="og:url" content="https://pierry.github.io/newsletters/${entryId}" />`
      )
      .replace(
        /<meta property="og:type" content="[^"]*"[^>]*\/>/,
        `<meta property="og:type" content="article" />`
      )
      // Update Twitter tags
      .replace(
        /<meta name="twitter:title" content="[^"]*"[^>]*\/>/,
        `<meta name="twitter:title" content="${title}" />`
      )
      .replace(
        /<meta name="twitter:description" content="[^"]*"[^>]*\/>/,
        `<meta name="twitter:description" content="${description}..." />`
      )
      .replace(
        /<meta name="twitter:url" content="[^"]*"[^>]*\/>/,
        `<meta name="twitter:url" content="https://pierry.github.io/newsletters/${entryId}" />`
      )
      // Update canonical
      .replace(
        /<link rel="canonical" href="[^"]*"[^>]*\/>/,
        `<link rel="canonical" href="https://pierry.github.io/newsletters/${entryId}" />`
      );
    
    // Write the file
    const entryDir = path.join(newslettersDir, entryId);
    if (!fs.existsSync(entryDir)) {
      fs.mkdirSync(entryDir, { recursive: true });
    }
    fs.writeFileSync(path.join(entryDir, 'index.html'), customHtml);
    generatedCount++;
  });
});

console.log(`✅ Generated ${generatedCount} newsletter entry pages with custom OG tags`);
