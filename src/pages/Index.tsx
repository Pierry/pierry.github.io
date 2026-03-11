import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Check, Eye, Headphones, Globe, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import newslettersData from "../data/newsletters.json";

type Lang = "en" | "pt";

// Recommended items with added dates for "New" badge logic
const recommendedItems = [
  {
    id: "tech-digest-podcast-ep1",
    title: "🎙️ Tech Digest Podcast",
    href: "https://open.spotify.com/episode/7b99MFyh2qDKxw5ut6rSaD",
    date: "Podcast",
    description: {
      en: "Weekly tech digest: System Design interviews, CAP Theorem patterns, and DeepMind's AI breakthrough in spatial reasoning.",
      pt: "Digest semanal de tech: entrevistas de System Design, padrões do CAP Theorem e o avanço da DeepMind em raciocínio espacial."
    },
    addedAt: "2026-03-09",
  },
  {
    id: "alloy-ai-prototyping",
    title: "Alloy",
    href: "https://alloy.app",
    date: "Tool",
    description: {
      en: "AI prototyping for product managers — create on-brand prototypes that look exactly like your real product, instantly.",
      pt: "Prototipagem com IA para PMs — crie protótipos que parecem exatamente com seu produto real, instantaneamente."
    },
    addedAt: "2026-03-02",
  },
  {
    id: "fowler-harness-engineering",
    title: "Harness Engineering",
    href: "https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html",
    date: "Martin Fowler",
    description: {
      en: "Thoughts on OpenAI's approach to AI-maintained codebases — using harnesses (tooling, linters, structural tests) to keep AI agents in check.",
      pt: "Reflexões sobre a abordagem da OpenAI para codebases mantidas por IA — usando harnesses (tooling, linters, testes estruturais) para manter agentes de IA sob controle."
    },
    addedAt: "2026-02-19",
  },
  {
    id: "mckinsey-dev-productivity-genai",
    title: "Unleashing Developer Productivity with Generative AI",
    href: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai",
    date: "McKinsey",
    description: {
      en: "McKinsey's research on how generative AI is transforming software development and boosting developer productivity.",
      pt: "Pesquisa da McKinsey sobre como IA generativa está transformando o desenvolvimento de software e aumentando a produtividade dos devs."
    },
    addedAt: "2026-02-02",
  },
  {
    id: "clawdbot",
    title: "Clawdbot",
    href: "https://github.com/clawdbot/clawdbot",
    date: "Open Source",
    description: {
      en: "A personal AI assistant you run on your own devices. Works with WhatsApp, Telegram, Slack, Discord, and more.",
      pt: "Um assistente pessoal de IA que roda nos seus próprios dispositivos. Funciona com WhatsApp, Telegram, Slack, Discord e mais."
    },
    addedAt: "2026-01-30",
  },
  {
    id: "agentic-ai-podcast",
    title: "Agentic AI Transformation: Workforce Strategy & Leadership",
    href: "https://open.spotify.com/episode/5oARH9ayPqwvO1PHpDF0x6",
    date: "Jan 2026",
    description: {
      en: "Podcast episode exploring how agentic AI is reshaping workforce strategy and what leaders need to know.",
      pt: "Episódio de podcast explorando como IA agêntica está reformulando estratégia de workforce e o que líderes precisam saber."
    },
    addedAt: "2026-01-29",
  },
  {
    id: "speed-never-just-speed",
    title: "Speed Is Never Just Speed",
    href: "https://mikefisher.substack.com/p/speed-is-never-just-speed",
    date: "Jan 2026",
    description: {
      en: "Mike Fisher on how speed emerges from focus, collaboration, transformation, and psychological safety — using rugby as a powerful metaphor for high-performing teams.",
      pt: "Mike Fisher sobre como velocidade emerge de foco, colaboração, transformação e segurança psicológica — usando rugby como metáfora para times de alta performance."
    },
    addedAt: "2026-01-29",
  },
  {
    id: "state-of-ai-2025",
    title: "State of AI in Business 2025",
    href: "https://drive.google.com/file/d/18AsBgiv6uiG6YEpfy_OEvtvplEw4Oo7E/view",
    date: "Jan 2025",
    description: {
      en: "A comprehensive report on how companies are adopting AI across industries. Great insights on trends, challenges, and what's coming next.",
      pt: "Um relatório abrangente sobre como empresas estão adotando IA em diversas indústrias. Ótimos insights sobre tendências, desafios e o que vem por aí."
    },
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

// Translations
const t = {
  en: {
    newsletters: "Newsletters",
    cv: "CV",
    contact: "Contact",
    home: "Home",
    heroGreeting: "Hey, I'm Pierry.",
    heroIntro: "Engineering Manager focused on delivering real value through technology, understanding what users truly need, and helping teams reach their full potential.",
    heroDesc: "14 years shipping software across fintech, healthtech, and logistics. Currently leading engineering at Intelipost and building",
    heroDescCont: ", a platform for engineering delivery metrics. I'm also maintaining an open-source",
    heroPlaybook: "Engineering Delivery Playbook",
    heroTech: "I care about backend development (Java, Kotlin, Python, Node), mobile (Android, iOS, Flutter, KMP), architecture, and actually solving problems that matter.",
    heroPodcast: "I also run a daily podcast with curated tech insights —",
    podcastSection: "🎙️ Podcast",
    podcastTitle: "Pierry's Tech Digest",
    podcastDesc: "New episode every day.",
    podcastDescCont: "I curate the top 3 most relevant articles from tech newsletters and YouTube channels, covering system design, AI breakthroughs, engineering leadership, and dev productivity.",
    podcastAI: "🤖 Powered by AI — Each morning I use NotebookLM to transform my curated research into conversational audio. Perfect for your commute, workout, or whenever you want to stay sharp without reading walls of text.",
    listenSpotify: "Listen on Spotify",
    podcastCompact: "Daily episodes with top 3 curated articles from tech newsletters. New every morning!",
    experience: "Experience",
    projects: "Projects",
    openSourceApps: "Open-source Apps",
    recommended: "Recommended",
    viewCode: "View Code",
    new: "New",
    seen: "Seen",
    markSeen: "Mark Seen",
    // Experience
    expIntelipost: "Engineering Manager, 2023–Present",
    expPicPay: "Engineering Manager, 2022–2023",
    expFleury: "Engineering Manager, 2018–2022",
    exp4bus: "Mobile Architect, 2018",
    expExpense: "Technical Lead, 2016–2018",
    expDeloitte: "Mobile Engineer, 2016",
    // Projects
    projSpaceMetrics: "Engineering delivery analytics",
    projPlaybook: "Open source",
    projHowMuch: "iOS App",
    projTodone: "Task management app",
    // Open-source descriptions
    ossMeeting: "A simple messaging app for meetings and team communication.",
    ossWhere: "A fun visualization that shows where in the world you would have been born based on global population distribution at your birth date.",
    ossCloudDancer: "A serene, light theme for JetBrains IDEs inspired by Pantone's 2026 Color of the Year.",
    ossAwesome: "A curated collection of awesome use cases, prompts, workflows, and resources for Clawdbot.",
    // Daily Digest section
    dailyDigest: "📰 Daily Tech Digest",
    dailyDigestDesc: "Curated insights from top tech newsletters, every day.",
    viewAll: "View all →",
    listenPodcast: "Listen to Podcast",
    readArticle: "Read",
  },
  pt: {
    newsletters: "Newsletters",
    cv: "CV",
    contact: "Contato",
    home: "Início",
    heroGreeting: "E aí, sou o Pierry.",
    heroIntro: "Engineering Manager focado em entregar valor real através de tecnologia, entendendo o que os usuários realmente precisam e ajudando times a alcançar seu potencial máximo.",
    heroDesc: "14 anos entregando software em fintech, healthtech e logística. Atualmente liderando engenharia na Intelipost e construindo",
    heroDescCont: ", uma plataforma de métricas de delivery de engenharia. Também mantenho um",
    heroPlaybook: "Engineering Delivery Playbook",
    heroTech: "Curto desenvolvimento backend (Java, Kotlin, Python, Node), mobile (Android, iOS, Flutter, KMP), arquitetura, e resolver problemas que realmente importam.",
    heroPodcast: "Também tenho um podcast diário com insights de tech curados —",
    podcastSection: "🎙️ Podcast",
    podcastTitle: "Pierry's Tech Digest",
    podcastDesc: "Episódio novo todo dia.",
    podcastDescCont: "Eu curo os 3 artigos mais relevantes de newsletters e canais do YouTube, cobrindo system design, avanços em IA, liderança de engenharia e produtividade dev.",
    podcastAI: "🤖 Powered by AI — Toda manhã uso NotebookLM pra transformar minha pesquisa curada em áudio conversacional. Perfeito pro seu trajeto, treino, ou quando quiser se atualizar sem ler paredes de texto.",
    listenSpotify: "Ouvir no Spotify",
    podcastCompact: "Episódios diários com os 3 melhores artigos de newsletters tech. Novo toda manhã!",
    experience: "Experiência",
    projects: "Projetos",
    openSourceApps: "Apps Open-source",
    recommended: "Recomendados",
    viewCode: "Ver Código",
    new: "Novo",
    seen: "Visto",
    markSeen: "Marcar Visto",
    // Experience
    expIntelipost: "Engineering Manager, 2023–Atual",
    expPicPay: "Engineering Manager, 2022–2023",
    expFleury: "Engineering Manager, 2018–2022",
    exp4bus: "Mobile Architect, 2018",
    expExpense: "Technical Lead, 2016–2018",
    expDeloitte: "Mobile Engineer, 2016",
    // Projects
    projSpaceMetrics: "Analytics de delivery de engenharia",
    projPlaybook: "Open source",
    projHowMuch: "App iOS",
    projTodone: "App de gestão de tarefas",
    // Open-source descriptions
    ossMeeting: "Um app simples de mensagens para reuniões e comunicação de times.",
    ossWhere: "Uma visualização divertida que mostra onde no mundo você teria nascido baseado na distribuição populacional global na sua data de nascimento.",
    ossCloudDancer: "Um tema sereno e claro para IDEs JetBrains inspirado na Cor do Ano 2026 da Pantone.",
    ossAwesome: "Uma coleção curada de casos de uso, prompts, workflows e recursos para o Clawdbot.",
    // Daily Digest section
    dailyDigest: "📰 Tech Digest Diário",
    dailyDigestDesc: "Insights curados das melhores newsletters de tech, todo dia.",
    viewAll: "Ver todos →",
    listenPodcast: "Ouvir Podcast",
    readArticle: "Ler",
  }
};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [seenItems, setSeenItems] = useState<Set<string>>(new Set());
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang') as Lang | null;
      if (stored === 'en' || stored === 'pt') return stored;
    }
    return 'en';
  });

  const toggleLang = () => {
    const newLang = lang === "en" ? "pt" : "en";
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const i18n = t[lang];

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
                {i18n.newsletters}
              </Link>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {i18n.cv}
              </a>
              <a
                href="mailto:pieerry@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {i18n.contact}
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
                to="/newsletters"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {i18n.newsletters}
              </Link>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {i18n.cv}
              </a>
              <a
                href="mailto:pieerry@gmail.com"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {i18n.contact}
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
            {i18n.heroGreeting}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            {i18n.heroIntro}
          </p>

          <p className="text-base text-muted-foreground/80 leading-relaxed mb-6">
            {i18n.heroDesc}{" "}
            <a href="https://spacemetrics.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              SpaceMetrics.ai
            </a>
            {i18n.heroDescCont}{" "}
            <a href="https://github.com/space-metrics-ai/engineering-delivery-playbook" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {i18n.heroPlaybook}
            </a>
            .
          </p>

          <p className="text-base text-muted-foreground/80 leading-relaxed mb-6">
            {i18n.heroTech}
          </p>

          <p className="text-base text-muted-foreground/80 leading-relaxed mb-8">
            {i18n.heroPodcast}{" "}
            <a
              href="https://open.spotify.com/show/7lDGFYZNOM6ERjPCRLIrb5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DB954] hover:underline font-medium"
            >
              Pierry's Tech Digest
            </a>
            .
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
          </div>
        </section>

        {/* Daily Tech Digest Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {i18n.dailyDigest}
            </h2>
            <a
              href="https://open.spotify.com/show/7lDGFYZNOM6ERjPCRLIrb5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1DB954] hover:underline"
            >
              <Headphones size={14} />
              {i18n.listenPodcast}
            </a>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {i18n.dailyDigestDesc}
          </p>

          <div className="space-y-4">
            {newslettersData.digests.slice(0, 3).map((digest) => (
              <div key={digest.id} className="border border-border rounded-lg p-4 hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">
                        {new Date(digest.date + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", {
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                      <span className="text-xs text-muted-foreground/50">•</span>
                      <span className="text-xs text-primary">{digest.entries[0]?.newsletter}</span>
                    </div>
                    <h3 className="text-base font-medium text-foreground mb-1 line-clamp-1">
                      {digest.entries[0]?.title[lang]}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {digest.entries[0]?.summary[lang].slice(0, 150)}...
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {(digest as any).podcastLink && (
                      <a
                        href={(digest as any).podcastLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#1DB954] hover:underline"
                      >
                        <Headphones size={12} />
                        🎧
                      </a>
                    )}
                    <Link
                      to={`/newsletters/${digest.id}-1`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      {i18n.readArticle}
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link
              to="/newsletters"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {i18n.viewAll}
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            {i18n.experience}
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Intelipost</span>
              <span className="text-sm text-muted-foreground">{i18n.expIntelipost}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">PicPay</span>
              <span className="text-sm text-muted-foreground">{i18n.expPicPay}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Grupo Fleury</span>
              <span className="text-sm text-muted-foreground">{i18n.expFleury}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">4bus</span>
              <span className="text-sm text-muted-foreground">{i18n.exp4bus}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Expense Mobi</span>
              <span className="text-sm text-muted-foreground">{i18n.expExpense}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-foreground">Deloitte</span>
              <span className="text-sm text-muted-foreground">{i18n.expDeloitte}</span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            {i18n.projects}
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
              <span className="text-sm text-muted-foreground">{i18n.projSpaceMetrics}</span>
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
              <span className="text-sm text-muted-foreground">{i18n.projPlaybook}</span>
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
              <span className="text-sm text-muted-foreground">{i18n.projHowMuch}</span>
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
              <span className="text-sm text-muted-foreground">{i18n.projTodone}</span>
            </div>
          </div>
        </section>

        {/* Open-source Apps Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            {i18n.openSourceApps}
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
                  {i18n.viewCode}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {i18n.ossMeeting}
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
                  {i18n.viewCode}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {i18n.ossWhere}
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
                  {i18n.viewCode}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {i18n.ossCloudDancer}
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
                  {i18n.viewCode}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {i18n.ossAwesome}
              </p>
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            {i18n.recommended}
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
                          {i18n.new}
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
                        title={isSeen ? (lang === "en" ? "Mark as unread" : "Marcar como não lido") : (lang === "en" ? "Mark as seen" : "Marcar como visto")}
                      >
                        {isSeen ? (
                          <>
                            <Check size={12} />
                            {i18n.seen}
                          </>
                        ) : (
                          <>
                            <Eye size={12} />
                            {i18n.markSeen}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description[lang]}
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
