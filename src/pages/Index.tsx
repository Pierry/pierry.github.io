import { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin, Headphones, Globe, ArrowRight, ExternalLink, Mail, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TechStack } from "@/components/TechStack";
import PodcastEpisodes from "@/components/PodcastEpisodes";
import { SubscribeDialog, isSubscribed } from "@/components/SubscribeDialog";
import newslettersData from "../data/newsletters.json";
import threadsData from "../data/threads.json";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Lang = "en" | "pt";

// Translations
const t = {
  en: {
    newsletters: "Newsletters",
    threads: "Threads",
    cv: "CV",
    contact: "Contact",
    home: "Home",
    heroGreeting: "Hey, I'm Pierry.",
    heroIntro: "Engineering leader scaling multi-squad organizations across fintech, healthtech, and logistics. I run on metrics (DORA, SPACE), invest in managers, and tie technical strategy to business outcomes.",
    heroDesc: "14 years shipping software across fintech, healthtech, and logistics. Currently leading engineering at Intelipost.",
    heroDescCont: "",
    heroTech: "I care about backend development (Java, Kotlin, Python, Node, Go), mobile (Android, iOS, Flutter, KMP, React Native), TypeScript, architecture, and actually solving problems that matter.",
    heroPodcast: "I also run a podcast every 3 days with curated tech insights —",
    newsletterLabel: "Daily Newsletter",
    newsletterPitch: "2 posts a day: practical summaries curated from blogs, sites, and YouTube channels — stay current on the tech community without hunting across a hundred sources.",
    podcastSection: "Podcast",
    podcastTitle: "Pierry's Tech Digest",
    podcastDesc: "New episode every 3 days.",
    podcastDescCont: "I curate the top 3 most relevant articles from tech newsletters and YouTube channels, covering system design, AI breakthroughs, engineering leadership, and dev productivity.",
    podcastAI: "Powered by AI — I use NotebookLM to transform my curated research into conversational audio. Perfect for your commute, workout, or whenever you want to stay sharp without reading walls of text.",
    listenSpotify: "Listen on Spotify",
    podcastCompact: "Episodes every 3 days with top 3 curated articles from tech newsletters.",
    experience: "Experience",
    projects: "Projects",
    openSourceApps: "Open Source",
    viewCode: "View Code",
    // Experience
    expIntelipost: "Engineering Manager, 2023–Present",
    expPicPay: "Engineering Manager, 2022–2023",
    expFleury: "Engineering Manager, 2018–2022",
    exp4bus: "Mobile Architect, 2018",
    expExpense: "Technical Lead, 2016–2018",
    expDeloitte: "Mobile Engineer, 2016",
    // Impact lines (director-level framing)
    impactIntelipost: "Led engineering for one BU; a year ago took over 3 squads in the core BU on an AI-First mandate — end-to-end flow across PD/PM/EM and engineers via harness engineering. Revenue-focused on the business side: retention, conversion, and innovation.",
    impactPicPay: "Led the Privacy & Trust team of the Social product (20M MAU); built a T-shaped team from scratch in a regulated fintech environment, lifting in-app trust through defensive plays — alerts, notices, and validation flows before sensitive operations.",
    impactFleury: "Led 5 teams through hypergrowth in regulated healthtech; scaled mobile from 40k to 1M+ users with a 50% smaller maintenance team.",
    impact4bus: "Designed the mobile architecture from scratch; product reached top 3 transportation apps in Brazil.",
    impactExpense: "Tech lead of an expense management app with geolocation-based reimbursement as the core feature; stabilized the platform through delivery quality, improved crash reporting, and tightened incident response — lifting company credibility.",
    impactDeloitte: "Built a low-latency mobile app integrating rural producers with BRF's supply chain.",
    // Projects
    projJsonEditor: "Modern JSON editor with themes",
    projSpaceMetrics: "",
    projHowMuch: "iOS App",
    projTodone: "Task management app",
    projDevSimulator: "Indie game",
    // Open-source descriptions
    ossJsonEditor: "A modern, fast, and beautiful JSON editor built with React and Material Design 3. Features auto-format, multiple themes, and local storage.",
    ossMeeting: "A simple messaging app for meetings and team communication.",
    ossCloudDancer: "A serene, light theme for JetBrains IDEs inspired by Pantone's 2026 Color of the Year.",
    // Newsletter section
    dailyDigest: "Latest from Newsletter",
    dailyDigestDesc: "Latest issues — curated summaries from blogs, sites, and YouTube channels across the tech community.",
    viewAll: "View all →",
    listenPodcast: "Listen to Podcast",
    readArticle: "Read",
    subscribeCta: "Subscribe",
    subscribeAlready: "You're subscribed",
    subscribePlaceholder: "you@example.com",
    // Threads section
    threadsSection: "Threads",
    threadsDesc: "Recurring themes across digests, stitched together.",
    readThread: "Read",
    // Stats strip
    statYearsLabel: "yrs shipping",
    statSquadsValue: "20M+",
    statSquadsLabel: "MAU served",
    statTeamsValue: "5",
    statTeamsLabel: "teams led at peak",
    statScaleValue: "40k→1M+",
    statScaleLabel: "users scaled",
    // Leadership principles
    leadershipSection: "How I Lead",
    principleMetricsTitle: "Run on metrics",
    principleMetricsBody: "DORA and SPACE drive cadence. Cycle time and deploy frequency are leading indicators of org health — not vanity dashboards.",
    principleManagersTitle: "Invest in managers",
    principleManagersBody: "T-shaped culture, with managers owning headcount, hiring, dev plans, and roadmap predictability. The org scales when its leaders do.",
    principleBusinessTitle: "Tie tech to business",
    principleBusinessBody: "Every technical bet connects to revenue, retention, or compliance. Engineering carries P&L accountability — not just velocity.",
    principleAITitle: "AI-First by default",
    principleAIBody: "Claude Code, Skills, and Harness in the loop. The IC of 2027 is not the IC of 2024 — and neither is the manager.",
  },
  pt: {
    newsletters: "Newsletters",
    threads: "Threads",
    cv: "CV",
    contact: "Contato",
    home: "Início",
    heroGreeting: "E aí, sou o Pierry.",
    heroIntro: "Liderança de engenharia escalando organizações multi-squad em fintech, healthtech e logística. Trabalho com métricas (DORA, SPACE), invisto em managers e amarro estratégia técnica a resultado de negócio.",
    heroDesc: "14 anos entregando software em fintech, healthtech e logística. Atualmente liderando engenharia na Intelipost.",
    heroDescCont: "",
    heroTech: "Curto desenvolvimento backend (Java, Kotlin, Python, Node), mobile (Android, iOS, Flutter, KMP), arquitetura, e resolver problemas que realmente importam.",
    heroPodcast: "Também tenho um podcast a cada 3 dias com insights de tech curados —",
    newsletterLabel: "Newsletter diária",
    newsletterPitch: "2 posts por dia: resumos práticos curados de blogs, sites e canais de YouTube — pra você se manter informado do que tá rolando na comunidade tech, sem precisar caçar em mil lugares.",
    podcastSection: "Podcast",
    podcastTitle: "Pierry's Tech Digest",
    podcastDesc: "Episódio novo a cada 3 dias.",
    podcastDescCont: "Eu curo os 3 artigos mais relevantes de newsletters e canais do YouTube, cobrindo system design, avanços em IA, liderança de engenharia e produtividade dev.",
    podcastAI: "Powered by AI — Uso NotebookLM pra transformar minha pesquisa curada em áudio conversacional. Perfeito pro seu trajeto, treino, ou quando quiser se atualizar sem ler paredes de texto.",
    listenSpotify: "Ouvir no Spotify",
    podcastCompact: "Episódios a cada 3 dias com os 3 melhores artigos de newsletters tech.",
    experience: "Experiência",
    projects: "Projetos",
    openSourceApps: "Open Source",
    viewCode: "Ver Código",
    // Experience
    expIntelipost: "Engineering Manager, 2023–Atual",
    expPicPay: "Engineering Manager, 2022–2023",
    expFleury: "Engineering Manager, 2018–2022",
    exp4bus: "Mobile Architect, 2018",
    expExpense: "Technical Lead, 2016–2018",
    expDeloitte: "Mobile Engineer, 2016",
    // Impact lines (framing diretor de engenharia)
    impactIntelipost: "Liderei engenharia de uma BU do grupo e, há um ano, assumi 3 squads da BU principal com foco AI-First — fluxo end-to-end de PD/PM/EM e engenheiros via harness engineering. No negócio, foco direto em receita: retenção, conversão e inovação.",
    impactPicPay: "Liderei o time de Privacy & Trust do produto Social (20M MAU); montei time T-shaped do zero em ambiente regulado de fintech, elevando a confiança no app por meio de ações defensivas — alertas, comunicados e fluxos de validação antes de operações sensíveis.",
    impactFleury: "Liderei 5 times em hypergrowth em healthtech regulado; escalei mobile de 40k para 1M+ usuários com time de manutenção 50% menor.",
    impact4bus: "Desenhei arquitetura mobile do zero; produto chegou ao top 3 de apps de transporte do Brasil.",
    impactExpense: "Liderança técnica de app de gestão de despesas com reembolso por geolocalização como funcionalidade central; estabilizei a plataforma com qualidade na entrega, melhorias em crash reporting e tratamento de incidentes — elevando a credibilidade da empresa.",
    impactDeloitte: "Construí app mobile com protocolos de baixa latência integrando produtores rurais à cadeia da BRF.",
    // Projects
    projJsonEditor: "Editor JSON moderno com temas",
    projSpaceMetrics: "",
    projHowMuch: "App iOS",
    projTodone: "App de gestão de tarefas",
    projDevSimulator: "Jogo indie",
    // Open-source descriptions
    ossJsonEditor: "Um editor JSON moderno, rápido e bonito feito com React e Material Design 3. Auto-formatação, múltiplos temas e armazenamento local.",
    ossMeeting: "Um app simples de mensagens para reuniões e comunicação de times.",
    ossCloudDancer: "Um tema sereno e claro para IDEs JetBrains inspirado na Cor do Ano 2026 da Pantone.",
    // Newsletter section
    dailyDigest: "Últimos da Newsletter",
    dailyDigestDesc: "Últimas edições — resumos curados de blogs, sites e canais de YouTube da comunidade tech.",
    viewAll: "Ver todos →",
    listenPodcast: "Ouvir Podcast",
    readArticle: "Ler",
    subscribeCta: "Inscrever-se",
    subscribeAlready: "Você está inscrito",
    subscribePlaceholder: "voce@exemplo.com",
    // Threads section
    threadsSection: "Threads",
    threadsDesc: "Padrões que se repetem entre as edições, costurados.",
    readThread: "Ler",
    // Stats strip
    statYearsLabel: "anos shipando",
    statSquadsValue: "20M+",
    statSquadsLabel: "MAU servidos",
    statTeamsValue: "5",
    statTeamsLabel: "times no auge",
    statScaleValue: "40k→1M+",
    statScaleLabel: "usuários escalados",
    // Leadership principles
    leadershipSection: "Como eu lidero",
    principleMetricsTitle: "Métrica é leme",
    principleMetricsBody: "DORA e SPACE pautam a cadência. Cycle time e frequência de deploy são indicadores antecipados de saúde do time — não dashboard de vaidade.",
    principleManagersTitle: "Invisto em managers",
    principleManagersBody: "Cultura T-shaped, com managers donos de headcount, contratação, plano de desenvolvimento e previsibilidade de roadmap. A organização escala quando os líderes escalam.",
    principleBusinessTitle: "Tech amarrado a negócio",
    principleBusinessBody: "Toda aposta técnica conecta com receita, retenção ou compliance. Engenharia carrega P&L — não só velocity.",
    principleAITitle: "AI-First por padrão",
    principleAIBody: "Claude Code, Skills e Harness no fluxo. O IC de 2027 não é o de 2024 — e o manager também não.",
  }
};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang') as Lang | null;
      if (stored === 'en' || stored === 'pt') return stored;
    }
    return 'en';
  });
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    setAlreadySubscribed(isSubscribed());
  }, [subscribeOpen]);

  const toggleLang = () => {
    const newLang = lang === "en" ? "pt" : "en";
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const onInlineSubscribe = (e?: any) => {
    if (e?.preventDefault) e.preventDefault();
    if (!EMAIL_RE.test(subscribeEmail.trim())) return;
    setSubscribeOpen(true);
  };

  const i18n = t[lang];

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
              <a
                href="https://open.spotify.com/show/7lDGFYZNOM6ERjPCRLIrb5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-[#1DB954] transition-colors flex items-center gap-1"
              >
                <Headphones size={14} />
                Podcast
              </a>
              <Link
                to="/newsletters"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {i18n.newsletters}
              </Link>
              <Link
                to="/threads"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {i18n.threads}
              </Link>
              <a
                href="/PierryBorges.pdf"
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
              <a
                href="https://open.spotify.com/show/7lDGFYZNOM6ERjPCRLIrb5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#1DB954] transition-colors py-1"
              >
                <Headphones size={14} />
                Podcast
              </a>
              <Link
                to="/newsletters"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {i18n.newsletters}
              </Link>
              <Link
                to="/threads"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {i18n.threads}
              </Link>
              <a
                href="/PierryBorges.pdf"
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
            {i18n.heroDesc}
            {i18n.heroDescCont}
          </p>

          <div className="mb-6">
            <TechStack lang={lang} />
          </div>

          <p className="text-base text-muted-foreground/80 leading-relaxed mb-4">
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

          <div className="md-card-elevated p-5 mb-8">
            <h2 className="text-sm font-semibold text-foreground mb-1.5">
              {i18n.newsletterLabel}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {i18n.newsletterPitch}
            </p>
            {!alreadySubscribed ? (
              <form
                onSubmit={onInlineSubscribe}
                noValidate
                className="flex items-stretch border border-border rounded-md overflow-hidden bg-background focus-within:border-primary transition-colors"
              >
                <input
                  type="email"
                  autoComplete="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder={i18n.subscribePlaceholder}
                  className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Mail size={14} />
                  {i18n.subscribeCta}
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Check size={14} className="text-green-500" />
                {i18n.subscribeAlready}
              </div>
            )}
          </div>

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

        {/* Stats Strip */}
        <section className="mb-16">
          <div className="md-card-filled grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 px-6 py-6">
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">14</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">{i18n.statYearsLabel}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">{i18n.statSquadsValue}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">{i18n.statSquadsLabel}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">{i18n.statTeamsValue}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">{i18n.statTeamsLabel}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">{i18n.statScaleValue}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">{i18n.statScaleLabel}</div>
            </div>
          </div>
        </section>

        {/* Leadership Principles */}
        <section className="mb-20">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            {i18n.leadershipSection}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="md-card-filled p-5">
              <h3 className="text-base font-semibold text-foreground mb-1">{i18n.principleMetricsTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i18n.principleMetricsBody}</p>
            </div>
            <div className="md-card-filled p-5">
              <h3 className="text-base font-semibold text-foreground mb-1">{i18n.principleManagersTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i18n.principleManagersBody}</p>
            </div>
            <div className="md-card-filled p-5">
              <h3 className="text-base font-semibold text-foreground mb-1">{i18n.principleBusinessTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i18n.principleBusinessBody}</p>
            </div>
            <div className="md-card-filled p-5">
              <h3 className="text-base font-semibold text-foreground mb-1">{i18n.principleAITitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{i18n.principleAIBody}</p>
            </div>
          </div>
        </section>

        {/* Podcast Episodes Section */}
        <PodcastEpisodes lang={lang} />

        {/* Daily Tech Digest Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6 gap-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {i18n.dailyDigest}
            </h2>
            {!alreadySubscribed ? (
              <button
                onClick={() => setSubscribeOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <Mail size={14} />
                {i18n.subscribeCta}
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Check size={14} className="text-green-500" />
                {i18n.subscribeAlready}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {i18n.dailyDigestDesc}
          </p>

          <div className="space-y-4">
            {newslettersData.digests.slice(0, 3).map((digest) => (
              <div key={digest.id} className="md-card-elevated p-4">
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
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {(digest as any).podcastLink && (
                      <a
                        href={(digest as any).podcastLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1DB954] hover:text-[#1ed760] transition-colors"
                        title={lang === "en" ? "Listen on Spotify" : "Ouvir no Spotify"}
                      >
                        <Headphones size={18} />
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

        {/* Threads Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {i18n.threadsSection}
            </h2>
            <Link
              to="/threads"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              {i18n.viewAll}
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {i18n.threadsDesc}
          </p>

          <div className="space-y-4">
            {threadsData.threads.slice(0, 3).map((thread) => (
              <Link
                key={thread.slug}
                to={`/threads/${thread.slug}`}
                className="md-card-elevated block p-4 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                      <time dateTime={thread.date}>
                        {new Date(thread.date + "T12:00:00").toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span aria-hidden>·</span>
                      <span>
                        {thread.entries.length} {lang === "en" ? (thread.entries.length === 1 ? "post" : "posts") : "posts"}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {thread.title[lang as Lang]}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {thread.description[lang as Lang]}
                    </p>
                  </div>
                  <div className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {i18n.readThread}
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            {i18n.experience}
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <span className="text-base text-foreground">Intelipost</span>
                <span className="text-sm text-muted-foreground">{i18n.expIntelipost}</span>
              </div>
              <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">{i18n.impactIntelipost}</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <span className="text-base text-foreground">PicPay</span>
                <span className="text-sm text-muted-foreground">{i18n.expPicPay}</span>
              </div>
              <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">{i18n.impactPicPay}</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <span className="text-base text-foreground">Grupo Fleury</span>
                <span className="text-sm text-muted-foreground">{i18n.expFleury}</span>
              </div>
              <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">{i18n.impactFleury}</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <span className="text-base text-foreground">4bus</span>
                <span className="text-sm text-muted-foreground">{i18n.exp4bus}</span>
              </div>
              <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">{i18n.impact4bus}</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <span className="text-base text-foreground">Expense Mobi</span>
                <span className="text-sm text-muted-foreground">{i18n.expExpense}</span>
              </div>
              <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">{i18n.impactExpense}</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <span className="text-base text-foreground">Deloitte</span>
                <span className="text-sm text-muted-foreground">{i18n.expDeloitte}</span>
              </div>
              <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">{i18n.impactDeloitte}</p>
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
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="/games/dev-simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-foreground hover:text-primary transition-colors"
              >
                Dev Simulator
              </a>
              <span className="text-sm text-muted-foreground">{i18n.projDevSimulator}</span>
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
                  href="https://contractor-7427c.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-foreground hover:text-primary transition-colors"
                >
                  JSON Editor
                </a>
                <a
                  href="https://github.com/Pierry/json-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {i18n.viewCode}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {i18n.ossJsonEditor}
              </p>
            </div>

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

          </div>
        </section>

      </main>

      <SubscribeDialog
        open={subscribeOpen}
        onOpenChange={setSubscribeOpen}
        lang={lang}
        initialEmail={subscribeEmail}
      />

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
