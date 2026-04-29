import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, X, Github, Linkedin, Globe, ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThemeToggle } from "@/components/ThemeToggle";
import threadsData from "../data/threads.json";
import newslettersData from "../data/newsletters.json";

type Lang = "en" | "pt";

type LinkedEntry = {
  entryId: string;
  digestId: string;
  digestDate: string;
  newsletter: string;
  author: string;
  title: { en: string; pt: string };
  summary: { en: string; pt: string };
  link: string;
};

const buildEntryIndex = (): Map<string, LinkedEntry> => {
  const map = new Map<string, LinkedEntry>();
  for (const digest of newslettersData.digests) {
    for (const entry of digest.entries) {
      const id = `${digest.id}-${entry.rank}`;
      map.set(id, {
        entryId: id,
        digestId: digest.id,
        digestDate: digest.date,
        newsletter: entry.newsletter,
        author: entry.author,
        title: entry.title,
        summary: entry.summary,
        link: entry.link,
      });
    }
  }
  return map;
};

const Thread = () => {
  const { slug } = useParams<{ slug: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang") as Lang | null;
      if (stored === "en" || stored === "pt") return stored;
    }
    return "en";
  });

  const toggleLang = () => {
    const newLang = lang === "en" ? "pt" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const thread = useMemo(
    () => threadsData.threads.find((t) => t.slug === slug),
    [slug]
  );

  const entryIndex = useMemo(buildEntryIndex, []);
  const linkedEntries = useMemo(() => {
    if (!thread) return [];
    return thread.entries
      .map((id) => entryIndex.get(id))
      .filter((e): e is LinkedEntry => Boolean(e));
  }, [thread, entryIndex]);

  if (!thread) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            {lang === "en" ? "Thread not found" : "Thread não encontrada"}
          </h1>
          <Link to="/threads" className="text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={16} />
            {lang === "en" ? "Back to threads" : "Voltar para threads"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg font-medium text-foreground hover:text-foreground/80 transition-colors">
              Pierry Borges
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/newsletters" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Newsletters
              </Link>
              <Link to="/threads" className="text-sm text-foreground font-medium">
                Threads
              </Link>
              <a
                href="/PierryBorges.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                CV
              </a>
              <a
                href="mailto:pieerry@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe size={16} />
                {lang === "en" ? "PT" : "EN"}
              </button>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleLang} className="p-1 hover:bg-accent/50 transition-colors rounded text-sm text-muted-foreground">
                {lang === "en" ? "PT" : "EN"}
              </button>
              <ThemeToggle />
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 hover:bg-accent/50 transition-colors rounded">
                {mobileMenuOpen ? <X size={20} className="text-muted-foreground" /> : <Menu size={20} className="text-muted-foreground" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 space-y-2 border-t border-border pt-4">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                Home
              </Link>
              <Link to="/newsletters" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                Newsletters
              </Link>
              <Link to="/threads" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                Threads
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link to="/threads" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={14} />
          {lang === "en" ? "All threads" : "Todas as threads"}
        </Link>

        <header className="mb-10 pb-8 border-b border-border">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <time dateTime={thread.date}>
              {new Date(thread.date + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>
              {linkedEntries.length} {lang === "en" ? (linkedEntries.length === 1 ? "post" : "posts") : "posts"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4 leading-tight">
            {thread.title[lang]}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {thread.description[lang]}
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none mb-12 prose-p:text-foreground/90 prose-strong:text-foreground prose-headings:text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {thread.body[lang]}
          </ReactMarkdown>
        </article>

        {linkedEntries.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              {lang === "en" ? "Posts in this thread" : "Posts nesta thread"}
            </h2>
            <div className="space-y-4">
              {linkedEntries.map((entry) => (
                <Link
                  key={entry.entryId}
                  to={`/newsletters/${entry.entryId}`}
                  className="md-card-elevated block p-4 group"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{entry.newsletter}</span>
                    <span>·</span>
                    <span>{entry.author}</span>
                    <span>·</span>
                    <time dateTime={entry.digestDate}>
                      {new Date(entry.digestDate + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                    {entry.title[lang]}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {entry.summary[lang]}
                  </p>
                  <div className="inline-flex items-center gap-1 mt-2 text-xs text-primary">
                    {lang === "en" ? "Read on Newsletters" : "Ler em Newsletters"}
                    <ExternalLink size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Pierry Borges</p>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/Pierry" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-muted-foreground transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/pierryborges/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-muted-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Thread;
