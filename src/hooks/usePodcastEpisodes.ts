import { useState, useEffect } from 'react';

export interface PodcastEpisode {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  duration: string;
  language: 'en' | 'pt';
}

const RSS_URL = 'https://anchor.fm/s/10ffb9108/podcast/rss';

// Simple XML parser for RSS
function parseRSS(xml: string): PodcastEpisode[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = doc.querySelectorAll('item');
  
  const episodes: PodcastEpisode[] = [];
  
  items.forEach((item) => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const duration = item.querySelector('itunes\\:duration, duration')?.textContent || '';
    
    // Determine language from title
    const language: 'en' | 'pt' = title.includes('[PTBR]') || title.includes('[PT-BR]') ? 'pt' : 'en';
    
    episodes.push({
      title,
      description: description.replace(/<[^>]*>/g, '').trim(), // Strip HTML
      link,
      pubDate,
      duration,
      language,
    });
  });
  
  return episodes;
}

export function usePodcastEpisodes(limit: number = 10) {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        // Use a CORS proxy for client-side fetching
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`);
        if (!response.ok) throw new Error('Failed to fetch RSS');
        
        const xml = await response.text();
        const parsed = parseRSS(xml);
        setEpisodes(parsed.slice(0, limit));
      } catch (err) {
        console.error('Error fetching podcast episodes:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, [limit]);

  return { episodes, loading, error };
}
