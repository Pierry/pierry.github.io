import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const aiToolsData = {
  "Engenharia de Software": [
    { name: "Devin", description: "Assistente de codificação avançado", cost: "Freemium", link: "https://devin.ai" },
    { name: "Claude Code (Anthropic)", description: "Geração de código por prompts", cost: "Pago", link: "https://claude.ai/code" },
    { name: "GitHub Copilot", description: "Autocompletar e sugerir códigos", cost: "Pago", link: "https://github.com/features/copilot" },
    { name: "Cursor", description: "IDE com geração de código por instruções", cost: "Freemium", link: "https://www.cursor.com" },
    { name: "Codeium (Windsurf)", description: "IDE baseada em agentes GPT", cost: "Gratuita", link: "https://codeium.com/windsurf" },
    { name: "JetBrains AI Assistant", description: "Assistente IA integrado nas IDEs JetBrains", cost: "Pago", link: "https://www.jetbrains.com/ai" },
    { name: "MetaGPT", description: "Framework multi-agente para desenvolvimento", cost: "Open-source", link: "https://github.com/geekan/MetaGPT" },
    { name: "Factory AI", description: "Automação completa do ciclo dev com agentes", cost: "Pago", link: "https://www.factory.ai" },
    { name: "Spur", description: "QA automatizado com agentes virtuais", cost: "Pago", link: "https://www.spurtest.com" },
    { name: "Neon.tech", description: "Banco de dados PostgreSQL serverless", cost: "Freemium", link: "https://neon.tech" },
    { name: "OmniAI", description: "OCR avançado com visão computacional", cost: "Pago", link: "https://getomni.ai" },
    { name: "RepoMix", description: "Compactar código para análise por IA", cost: "Open-source", link: "https://github.com/yamadashy/repomix" },
  ],
  "Observabilidade e AIOps": [
    { name: "PromptLayer", description: "Gerenciamento e versionamento de prompts", cost: "Freemium", link: "https://www.promptlayer.com" },
    { name: "LlamaIndex", description: "Conecta bases documentais a modelos GPT", cost: "Freemium", link: "https://www.llamaindex.ai" },
    { name: "Helicone", description: "Monitoramento e observabilidade para chamadas LLM", cost: "Open-source", link: "https://www.helicone.ai" },
    { name: "Shadow", description: "Assistente IA para reuniões (transcrição/sumário)", cost: "Freemium", link: "https://www.shadow.do" },
    { name: "Glama MCP", description: "Integração IA com ferramentas (Sentry/GitHub/Postgres)", cost: "Pago", link: "https://glama.ai" },
  ],
  "Gestão de Produto": [
    { name: "ChatPRD", description: "Geração rápida de PRDs usando IA", cost: "Freemium", link: "https://www.chatprd.ai" },
    { name: "Kraftful", description: "Pesquisa automatizada com usuários", cost: "Pago", link: "https://www.kraftful.com" },
    { name: "Wordware", description: "Criação de agentes/workflows IA sem código", cost: "Freemium", link: "https://wordware.ai" },
    { name: "ElevenLabs Scribe", description: "Transcrição de áudio em texto", cost: "Pago", link: "https://elevenlabs.io/blog/meet-scribe" },
    { name: "Google AI Studio", description: "Análise e sumário de conteúdo em vídeo", cost: "Freemium", link: "https://aistudio.google.com" },
    { name: "ChatGPT", description: "Suporte geral à gestão de produto", cost: "Freemium", link: "https://chat.openai.com" },
  ],
  "Prototipagem Rápida": [
    { name: "Replit", description: "Plataforma completa para PoCs com assistente IA", cost: "Freemium", link: "https://replit.com" },
    { name: "Lovable", description: "Criação de protótipos via chat com IA", cost: "Freemium", link: "https://lovable.dev" },
    { name: "Vercel v0", description: "Construção de interfaces avançadas usando IA", cost: "Gratuita", link: "https://v0.dev" },
  ],
  "Operações e Automação": [
    { name: "Quadratic", description: "Planilhas inteligentes com IA integrada", cost: "Freemium", link: "https://www.quadratichq.com" },
    { name: "Chatbase", description: "Chatbots treinados com bases internas", cost: "Freemium", link: "https://www.chatbase.co" },
    { name: "Nanobrowser", description: "Automação no navegador usando agentes IA", cost: "Open-source", link: "https://github.com/nanobrowser/nanobrowser" },
  ],
  "Design e Interface": [
    { name: "Magic Patterns", description: "Geração rápida de protótipos UI com IA", cost: "Pago", link: "https://www.magicpatterns.com" },
    { name: "Anima", description: "Conversão automática de design em código", cost: "Freemium", link: "https://www.animaapp.com" },
    { name: "Zeplin", description: "Organização e documentação para dev handoff", cost: "Freemium", link: "https://zeplin.io" },
  ],
  "Marketing e Criativos": [
    { name: "Pika", description: "Geração de vídeos curtos a partir de texto", cost: "Freemium", link: "https://pika.art" },
    { name: "Runway ML", description: "Geração criativa de vídeos/imagens", cost: "Freemium", link: "https://runwayml.com" },
    { name: "Casixty", description: "Automação de engajamento no Reddit", cost: "Pago", link: "https://casixty.com" },
  ],
};

const insightsData = [
  { name: "Ben's Bites", description: "Newsletter popular sobre IA", link: "https://bensbites.com/newsletter" },
  { name: "TLDR AI", description: "Curadoria de novidades sobre IA", link: "https://tldr.tech/ai" },
  { name: "AlphaSignal", description: "Informações técnicas avançadas sobre IA", link: "https://alphasignal.ai" },
  { name: "YC Companies", description: "Diretório startups AI por data de lançamento", link: "https://www.ycombinator.com/companies" },
  { name: "Product Hunt", description: "Descoberta de novos produtos IA", link: "https://www.producthunt.com" },
  { name: "Sean Goedecke - LLMs", description: "Como usar LLMs em provas de conceito", link: "https://www.seangoedecke.com/how-i-use-llms" },
  { name: "Angular Ventures Insights", description: "Tendências estratégicas sobre software e IA", link: "https://www.angularventures.com/blog/the-end-state-of-software" },
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("articles");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const getCostBadgeVariant = (cost: string) => {
    if (cost === "Gratuita" || cost === "Open-source") return "default";
    if (cost === "Freemium") return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Pierry Borges</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection("articles")}
                className={`text-sm font-medium transition-colors ${activeSection === "articles" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
              >
                Artigos
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className={`text-sm font-medium transition-colors ${activeSection === "projects" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
              >
                Projetos
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className={`text-sm font-medium transition-colors ${activeSection === "contact" ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
              >
                Contato
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <button 
                onClick={() => scrollToSection("articles")}
                className="block w-full text-left px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Artigos
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Projetos
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Contato
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Olá, sou Pierry Borges
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Engenheiro de software apaixonado por tecnologia, inovação e compartilhamento de conhecimento. 
              Aqui você encontra artigos, ferramentas e insights sobre o mundo da tecnologia.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Artigos</h3>
            <p className="text-gray-600">Explorando tecnologia, IA e desenvolvimento de software</p>
          </div>

          {/* Featured Article */}
          <Card className="mb-12 border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar size={16} />
                <span>Janeiro 2025</span>
              </div>
              <CardTitle className="text-2xl">Catálogo de Ferramentas de IA (2025)</CardTitle>
              <CardDescription className="text-base">
                Uma curadoria completa das melhores ferramentas de IA para profissionais de tecnologia, 
                produto e criação de conteúdo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(aiToolsData).map(([category, tools]) => (
                <div key={category}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{category}</h4>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-medium">Ferramenta</TableHead>
                          <TableHead className="font-medium">Descrição</TableHead>
                          <TableHead className="font-medium">Custo</TableHead>
                          <TableHead className="font-medium text-right">Link</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tools.map((tool) => (
                          <TableRow key={tool.name}>
                            <TableCell className="font-medium">{tool.name}</TableCell>
                            <TableCell className="text-gray-600">{tool.description}</TableCell>
                            <TableCell>
                              <Badge variant={getCostBadgeVariant(tool.cost)}>
                                {tool.cost}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <a 
                                href={tool.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <ExternalLink size={16} />
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Insights Estratégicos e Referências</h4>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-medium">Recurso</TableHead>
                        <TableHead className="font-medium">Descrição</TableHead>
                        <TableHead className="font-medium text-right">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {insightsData.map((resource) => (
                        <TableRow key={resource.name}>
                          <TableCell className="font-medium">{resource.name}</TableCell>
                          <TableCell className="text-gray-600">{resource.description}</TableCell>
                          <TableCell className="text-right">
                            <a 
                              href={resource.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink size={16} />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Projetos</h3>
            <p className="text-gray-600">Trabalhos e contribuições open source</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards will go here */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Em breve</CardTitle>
                <CardDescription>
                  Novos projetos serão adicionados aqui
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Esta seção será atualizada com projetos interessantes e contribuições open source.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Contato</h3>
            <p className="text-gray-600">Vamos conversar!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              href="https://github.com/pierry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Github size={24} className="text-gray-700" />
              <div>
                <p className="font-medium text-gray-900">GitHub</p>
                <p className="text-sm text-gray-600">@pierry</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-gray-400" />
            </a>

            <a 
              href="https://linkedin.com/in/pierry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Linkedin size={24} className="text-gray-700" />
              <div>
                <p className="font-medium text-gray-900">LinkedIn</p>
                <p className="text-sm text-gray-600">Conecte-se comigo</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-gray-400" />
            </a>

            <a 
              href="mailto:contato@pierry.com" 
              className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Mail size={24} className="text-gray-700" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">Entre em contato</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-gray-400" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            © 2025 Pierry Borges. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;