import { Headphones, Clock, ExternalLink } from 'lucide-react';
import { usePodcastEpisodes } from '@/hooks/usePodcastEpisodes';

interface PodcastEpisodesProps {
  lang: 'en' | 'pt';
}

const PodcastEpisodes = ({ lang }: PodcastEpisodesProps) => {
  const { episodes } = usePodcastEpisodes(10);

  const i18n = {
    en: {
      title: 'Latest Episodes',
      subtitle: 'New episodes every 3 days',
      listen: 'Listen',
      listenAll: 'Listen on Spotify',
    },
    pt: {
      title: 'Últimos Episódios',
      subtitle: 'Novos episódios a cada 3 dias',
      listen: 'Ouvir',
      listenAll: 'Ouvir no Spotify',
    },
  };

  const t = i18n[lang];

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Clean title (remove [EN] / [PTBR] tags)
  const cleanTitle = (title: string) => {
    return title
      .replace(/\[EN\]\s*-?\s*/gi, '')
      .replace(/\[PTBR\]\s*-?\s*/gi, '')
      .replace(/\[PT-BR\]\s*-?\s*/gi, '')
      .replace(/^Ep\s*#\d+\s*-?\s*/i, '')
      .trim();
  };

  if (episodes.length === 0) {
    return null;
  }

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {t.title}
          </h2>
          <p className="text-xs text-muted-foreground/70 mt-1">{t.subtitle}</p>
        </div>
        <a
          href="https://open.spotify.com/show/7lDGFYZNOM6ERjPCRLIrb5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1DB954] hover:underline"
        >
          <Headphones size={14} />
          {t.listenAll}
        </a>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative -mx-6 px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {episodes.map((episode, index) => (
            <a
              key={index}
              href={episode.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start group"
            >
              <div className="border border-border rounded-xl p-4 h-full bg-card hover:bg-accent/30 transition-all duration-200 hover:border-primary/30">
                {/* Language badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                    episode.language === 'en' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                      : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                  }`}>
                    {episode.language === 'en' ? 'EN' : 'PT'}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {episode.duration}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {cleanTitle(episode.title)}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                  {episode.description.slice(0, 150)}...
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(episode.pubDate)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1DB954] group-hover:underline">
                    {t.listen}
                    <ExternalLink size={10} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator for mobile */}
      <div className="flex justify-center gap-1 mt-2 md:hidden">
        <div className="w-8 h-1 bg-primary/30 rounded-full"></div>
        <div className="w-2 h-1 bg-border rounded-full"></div>
        <div className="w-2 h-1 bg-border rounded-full"></div>
      </div>
    </section>
  );
};

export default PodcastEpisodes;
