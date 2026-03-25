import episodesData from '../data/episodes.json';

export interface PodcastEpisode {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  duration: string;
  language: 'en' | 'pt';
}

export function usePodcastEpisodes(limit: number = 10) {
  const episodes = episodesData.episodes.slice(0, limit) as PodcastEpisode[];
  
  return { 
    episodes, 
    loading: false, 
    error: null 
  };
}
