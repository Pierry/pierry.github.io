import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Check, Eye, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

// Recommended items with added dates for "New" badge logic
const recommendedItems = [
  {
    id: "tech-digest-podcast-ep1",
    title: "🎙️ Tech Digest Podcast",
    href: "https://open.spotify.com/episode/7b99MFyh2qDKxw5ut6rSaD",
    date: "Podcast",
    description: "Weekly tech digest: System Design interviews, CAP Theorem patterns, and DeepMind's AI breakthrough in spatial reasoning.",
    addedAt: "2026-03-09",
  },
  {
    id: "alloy-ai-prototyping",
    title: "Alloy",
    href: "https://alloy.app",
    date: "Tool",
    description: "AI prototyping for product managers — create on-brand prototypes that look exactly like your real product, instantly.",
    addedAt: "2026-03-02",
  },
  {
    id: "fowler-harness-engineering",
    title: "Harness Engineering",
    href: "https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html",
    date: "Martin Fowler",
    description: "Thoughts on OpenAI's approach to AI-maintained codebases — using harnesses (tooling, linters, structural tests) to keep AI agents in check.",
    addedAt: "2026-02-19",
  },
  {
    id: "mckinsey-dev-productivity-genai",
    title: "Unleashing Developer Productivity with Generative AI",
    href: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai",
    date: "McKinsey",
    description: "McKinsey's research on how generative AI is transforming software development and boosting developer productivity.",
    addedAt: "2026-02-02",
  },
  {
    id: "clawdbot",
    title: "Clawdbot",
    href: "https://github.com/clawdbot/clawdbot",
    date: "Open Source",
    description: "A personal AI assistant you run on your own devices. Works with WhatsApp, Telegram, Slack, Discord, and more.",
    addedAt: "2026-01-30",
  },
  {
    id: "agentic-ai-podcast",
    title: "Agentic AI Transformation: Workforce Strategy & Leadership",
    href: "https://open.spotify.com/episode/5oARH9ayPqwvO1PHpDF0x6",
    date: "Jan 2026",
    description: "Podcast episode exploring how agentic AI is reshaping workforce strategy and what leaders need to know.",
    addedAt: "2026-01-29",
  },
  {
    id: "speed-never-just-speed",
    title: "Speed Is Never Just Speed",
    href: "https://mikefisher.substack.com/p/speed-is-never-just-speed",
    date: "Jan 2026",
    description: "Mike Fisher on how speed emerges from focus, collaboration, transformation, and psychological safety — using rugby as a powerful metaphor for high-performing teams.",
    addedAt: "2026-01-29",
  },
  {
    id: "state-of-ai-2025",
    title: "State of AI in Business 2025",
    href: "https://drive.google.com/file/d/18AsBgiv6uiG6YEpfy_OEvtvplEw4Oo7E/view",
    date: "Jan 2025",
    description: "A comprehensive report on how companies are adopting AI across industries. Great insights on trends, challenges, and what's coming next.",
    addedAt: "2025-01-15",
  },
];

const STORAGE_KEY = "pierry-site-seen-items";
const NEW_THRESHOLD_DAYS = 3;

const isNew = (addedAt: string): boolean => {
  const added = new Date(addedAt);
  const now = new Date();
  const diffTime = now.getTime() - added.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= NEW_THRESHOLD_DAYS;
};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [seenItems, setSeenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSeenItems(new Set(parsed));
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, []);

  const markAsSeen = (id: string) => {
    setSeenItems((prev) => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const markAsUnseen = (id: string) => {
    setSeenItems((prev) => {
      const next = new Set(prev);
      next.delete(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - Minimal, Joel Becker inspired */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg font-medium text-foreground hover:text-foreground/80 transition-colors">
              Pierry Borges
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/newsletters"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
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
                to="/newsletters"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Newsletters
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

        {/* Hero / Intro Section */}
        <section className="mb-20">
          {/* Profile Photo */}
          <div className="mb-8">
            <img
              src="/profile.jpg"
              alt="Pierry Borges"
              className="w-24 h-24 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          {/* Big Name */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight mb-6">
            Hey, I'm Pierry.
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            Engineering Manager focused on delivering real value through technology, understanding what users truly need, and helping teams reach their full potential.
          </p>

          <p className="text-base text-muted-foreground/80 leading-relaxed mb-6">
            14 years shipping software across fintech, healthtech, and logistics. Currently leading
            engineering at Intelipost and building{" "}
            <a href="https://spacemetrics.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              SpaceMetrics.ai
            </a>
            , a platform for engineering delivery metrics. I'm also maintaining an open-source{" "}
            <a href="https://github.com/space-metrics-ai/engineering-delivery-playbook" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Engineering Delivery Playbook
            </a>
            .
          </p>

          <p className="text-base text-muted-foreground/80 leading-relaxed mb-8">
            I care about backend development (Java, Kotlin, Python, Node), mobile
            (Android, iOS, Flutter, KMP), architecture, and actually solving problems
            that matter.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Pierry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/pierryborges/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://open.spotify.com/show/7IDGFYZNOM6ERjPCRLlrb5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-[#1DB954] transition-colors"
              aria-label="Tech Digest Podcast"
              title="Pierry's Tech Digest Podcast"
            >
              <Headphones size={22} />
            </a>
          </div>
        </section>

        {/* Podcast Section */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            🎙️ Podcast
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Spotify Embed */}
            <div className="w-full lg:w-auto flex-shrink-0">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/show/7IDGFYZNOM6ERjPCRLlrb5?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="lg:w-[300px]"
              ></iframe>
            </div>

            {/* Podcast Info */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Pierry's Tech Digest
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Weekly deep dives into the most relevant topics for senior developers and engineering managers. 
                Each episode covers system design patterns, AI breakthroughs, leadership insights, and curated 
                highlights from top tech newsletters and YouTube channels.
              </p>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                🤖 Powered by AI — I use NotebookLM to generate conversational audio from my daily tech research, 
                making it easy to stay updated during your commute or workout.
              </p>
              <a
                href="https://open.spotify.com/show/7IDGFYZNOM6ERjPCRLlrb5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DB954] text-white text-sm font-medium hover:bg-[#1ed760] transition-colors"
              >
                <Headphones size={16} />
                Listen on Spotify
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            Experience
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Intelipost</span>
              <span className="text-sm text-muted-foreground">Engineering Manager, 2023–Present</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">PicPay</span>
              <span className="text-sm text-muted-foreground">Engineering Manager, 2022–2023</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Grupo Fleury</span>
              <span className="text-sm text-muted-foreground">Engineering Manager, 2018–2022</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">4bus</span>
              <span className="text-sm text-muted-foreground">Mobile Architect, 2018</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Expense Mobi</span>
              <span className="text-sm text-muted-foreground">Technical Lead, 2016–2018</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Deloitte</span>
              <span className="text-sm text-muted-foreground">Mobile Engineer, 2016</span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            Projects
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://spacemetrics.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-foreground hover:text-primary transition-colors"
              >
                SpaceMetrics.ai
              </a>
              <span className="text-sm text-muted-foreground">Engineering delivery analytics</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://github.com/space-metrics-ai/engineering-delivery-playbook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-foreground hover:text-primary transition-colors"
              >
                Engineering Delivery Playbook
              </a>
              <span className="text-sm text-muted-foreground">Open source</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://apps.apple.com/us/app/how-much-i-run/id6748591105"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-foreground hover:text-primary transition-colors"
              >
                How Much I Run
              </a>
              <span className="text-sm text-muted-foreground">iOS App</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://todone.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-foreground hover:text-primary transition-colors"
              >
                Todone
              </a>
              <span className="text-sm text-muted-foreground">Task management app</span>
            </div>
          </div>
        </section>

        {/* Open-source Apps Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            Open-source Apps
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://meeting-messaging-app.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-foreground hover:text-primary transition-colors"
                >
                  Meeting Message
                </a>
                <a
                  href="https://github.com/Pierry/meeting-messaging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View Code
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                A simple messaging app for meetings and team communication.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://where-i-would-have-been-born.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-foreground hover:text-primary transition-colors"
                >
                  Where I Would Have Been Born
                </a>
                <a
                  href="https://github.com/Pierry/where-i-would-have-been-born"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View Code
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                A fun visualization that shows where in the world you would have been born based on global population distribution at your birth date.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://plugins.jetbrains.com/plugin/29931-cloud-dancer-theme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-foreground hover:text-primary transition-colors"
                >
                  Cloud Dancer Theme
                </a>
                <a
                  href="https://github.com/Pierry/cloud-dancer-theme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View Code
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                A serene, light theme for JetBrains IDEs inspired by Pantone's 2026 Color of the Year.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://github.com/space-metrics-ai/clawdbot-awesome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-foreground hover:text-primary transition-colors"
                >
                  Awesome Clawdbot
                </a>
                <a
                  href="https://github.com/space-metrics-ai/clawdbot-awesome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View Code
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                A curated collection of awesome use cases, prompts, workflows, and resources for Clawdbot.
              </p>
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            Recommended
          </h2>

          <div className="space-y-6">
            {recommendedItems.map((item) => {
              const itemIsNew = isNew(item.addedAt);
              const isSeen = seenItems.has(item.id);

              return (
                <div key={item.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </a>
                      {itemIsNew && !isSeen && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                      <button
                        onClick={() => isSeen ? markAsUnseen(item.id) : markAsSeen(item.id)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          isSeen
                            ? "bg-accent text-muted-foreground hover:bg-accent/80"
                            : "bg-accent/50 text-muted-foreground/80 hover:bg-accent"
                        }`}
                        title={isSeen ? "Mark as unread" : "Mark as seen"}
                      >
                        {isSeen ? (
                          <>
                            <Check size={12} />
                            Seen
                          </>
                        ) : (
                          <>
                            <Eye size={12} />
                            Mark Seen
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer - Minimal */}
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

export default Index;
