import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github, Linkedin, Globe, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import threadsData from "../data/threads.json";

type Lang = "en" | "pt";

const Threads = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
                title={lang === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
              >
                <Globe size={16} />
                {lang === "en" ? "PT" : "EN"}
              </button>
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="p-1 hover:bg-accent/50 transition-colors rounded text-sm text-muted-foreground"
              >
                {lang === "en" ? "PT" : "EN"}
              </button>
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 hover:bg-accent/50 transition-colors rounded"
              >
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
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <section className="mb-12">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-3">
            {lang === "en" ? "Threads" : "Threads"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {lang === "en" ? "Recurring themes, stitched together" : "Padrões que se repetem"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {lang === "en"
              ? "When several digests start chipping at the same idea, that's a thread. Editorial views connecting the dots across weeks."
              : "Quando várias edições começam a apontar pra mesma coisa, vira uma thread. Análises ligando os pontos ao longo de semanas."
            }
          </p>
        </section>

        <section>
          {threadsData.threads.length === 0 ? (
            <p className="text-muted-foreground">
              {lang === "en" ? "No threads yet." : "Nenhuma thread ainda."}
            </p>
          ) : (
            <div className="space-y-4">
              {threadsData.threads.map((thread) => (
                <article key={thread.slug} className="md-card-elevated p-6 group">
                  <Link to={`/threads/${thread.slug}`} className="block">
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
                        {thread.entries.length} {lang === "en" ? (thread.entries.length === 1 ? "post" : "posts") : (thread.entries.length === 1 ? "post" : "posts")}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-tight">
                      {thread.title[lang as Lang]}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {thread.description[lang as Lang]}
                    </p>
                    <div className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {lang === "en" ? "Read thread" : "Ler thread"}
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
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

export default Threads;
