import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github, Linkedin, Globe, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import newslettersData from "../data/newsletters.json";

type Lang = "en" | "pt";

const rankEmoji = (rank: number): string => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "📚";
};

const Newsletters = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang(lang === "en" ? "pt" : "en");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg font-medium text-foreground hover:text-foreground/80 transition-colors">
              Pierry Borges
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/#/newsletters"
                className="text-sm text-foreground font-medium"
              >
                Newsletters
              </Link>
              <a
                href="/cv.pdf"
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

            {/* Mobile Menu Button */}
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

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 space-y-2 border-t border-border pt-4">
              <Link
                to="/"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Home
              </Link>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                CV
              </a>
              <a
                href="mailto:pieerry@gmail.com"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Contact
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {lang === "en" ? "Newsletter Summary" : "Resumo de Newsletters"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {lang === "en" 
              ? "Curated daily digests from top engineering newsletters. Absorb key insights without leaving this page."
              : "Resumos diários curados das melhores newsletters de engenharia. Absorva os insights principais sem sair desta página."
            }
          </p>
        </section>

        {/* Timeline */}
        <section>
          {newslettersData.digests.map((digest) => (
            <div key={digest.id} className="mb-16">
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {new Date(digest.date + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Entries */}
              <div className="space-y-10">
                {digest.entries.map((entry, idx) => (
                  <article key={idx} className="relative">
                    {/* Rank Badge */}
                    <div className="flex items-start gap-4">
                      <span className="text-2xl" title={`Rank #${entry.rank}`}>
                        {rankEmoji(entry.rank)}
                      </span>
                      
                      <div className="flex-1">
                        {/* Newsletter & Author */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-primary">
                            {entry.newsletter}
                          </span>
                          <span className="text-sm text-muted-foreground/50">•</span>
                          <span className="text-sm text-muted-foreground">
                            {entry.author}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {entry.title[lang]}
                        </h3>

                        {/* Summary */}
                        <p className="text-base text-muted-foreground leading-relaxed mb-4">
                          {entry.summary[lang]}
                        </p>

                        {/* Insights */}
                        <div className="bg-accent/50 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-medium text-foreground/80 mb-2">
                            {lang === "en" ? "Key Insights" : "Insights Principais"}
                          </h4>
                          <ul className="space-y-2">
                            {entry.insights[lang].map((insight, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary mt-1">•</span>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Examples / How to Apply */}
                        {entry.examples && entry.examples[lang] && (
                          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-foreground/80 mb-2">
                              {lang === "en" ? "How to Apply" : "Como Aplicar"}
                            </h4>
                            <ul className="space-y-3">
                              {entry.examples[lang].map((example: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-0.5">→</span>
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Link */}
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          {lang === "en" ? "Read full article" : "Ler artigo completo"}
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pierry Borges
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Pierry"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/pierryborges/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Newsletters;
