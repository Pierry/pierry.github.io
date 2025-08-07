import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Calendar, ChevronRight, CheckCircle } from "lucide-react";
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
import { articles } from "@/articles";
import { getMonthYear } from "@/utils/dateUtils";

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
    if (cost === "Free" || cost === "Open-source") return "default";
    if (cost === "Freemium") return "secondary";
    return "outline";
  };

  // Get the latest article (AI Tools Catalog)
  const latestArticle = articles[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pierry Borges
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection("articles")}
                className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  activeSection === "articles" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                }`}
              >
                Articles
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  activeSection === "projects" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  activeSection === "contact" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} className="text-slate-600" /> : <Menu size={24} className="text-slate-600" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-slate-200 pt-4">
              <button 
                onClick={() => scrollToSection("articles")}
                className="block w-full text-left px-3 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Articles
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left px-3 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>


      {/* Articles Section */}
      <section id="articles" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Articles
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Exploring technology, AI, and software development
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-8">
            {articles.map((article) => (
              <Card key={article.slug} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar size={16} />
                    <span>{getMonthYear(article.createdAt)}</span>
                  </div>
                  <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                
                {/* Article Content */}
                {article.slug === 'ai-tools-catalog-2025' && (
                  <CardContent className="space-y-10">
                    {Object.entries(article.content.categories).map(([category, tools]) => (
                      <div key={category} className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                          <h4 className="text-xl font-bold text-slate-900">{category}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {(tools as any[]).map((tool) => (
                            <div key={tool.name} className="group p-4 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                              <div className="flex items-start justify-between mb-3">
                                <h5 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {tool.name}
                                </h5>
                                <div className="flex gap-2">
                                  {tool.tested && (
                                    <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1 border border-slate-200">
                                      <CheckCircle size={12} />
                                      Tested
                                    </Badge>
                                  )}
                                  <Badge variant={getCostBadgeVariant(tool.cost)} className={
                                    tool.cost === "Free" || tool.cost === "Open-source" 
                                      ? "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                                      : tool.cost === "Freemium"
                                      ? "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                  }>
                                    {tool.cost}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                                {tool.description}
                              </p>
                              <a 
                                href={tool.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                              >
                                Visit <ExternalLink size={14} />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Projects</h3>
            <p className="text-lg text-slate-600">My applications and contributions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              {/* App Icon/Image */}
              <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M13.5 2C13.5 2 15.5 3.5 15.5 6.5C15.5 9.5 13.5 11 13.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10.5 2C10.5 2 8.5 3.5 8.5 6.5C8.5 9.5 10.5 11 10.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 11V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 15L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 18L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">How Much I Run</CardTitle>
                <CardDescription className="text-slate-600">
                  iOS running app with Apple Health integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  A comprehensive run tracking app that seamlessly integrates with Apple Health. Features detailed analytics, performance tracking, motivational support, and multi-language support for runners of all levels.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200">iOS App</Badge>
                  <Badge className="bg-green-50 text-green-700 border border-green-200">Health & Fitness</Badge>
                  <Badge className="bg-purple-50 text-purple-700 border border-purple-200">Free</Badge>
                </div>
                <a 
                  href="https://apps.apple.com/us/app/how-much-i-run/id6748591105" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                >
                  View on App Store <ExternalLink size={14} />
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              {/* SpaceMetrics Icon/Image */}
              <div className="w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M3 3V21H21V3H3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M7 8L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 12L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 16L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="18" cy="6" r="3" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">SpaceMetrics.ai</CardTitle>
                <CardDescription className="text-slate-600">
                  Engineering Productivity Analytics Platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  A comprehensive analytics platform designed to measure and optimize engineering team productivity. Provides insights and metrics to help development teams improve their performance and delivery efficiency.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-50 text-purple-700 border border-purple-200">Analytics</Badge>
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200">SaaS</Badge>
                  <Badge className="bg-green-50 text-green-700 border border-green-200">Productivity</Badge>
                </div>
                <a 
                  href="https://spacemetrics.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                >
                  Visit Website <ExternalLink size={14} />
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">More Projects</CardTitle>
                <CardDescription className="text-slate-600">
                  Additional projects and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Explore more projects and open source contributions on GitHub.
                </p>
                <div className="mt-4">
                  <a 
                    href="https://github.com/Pierry" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                  >
                    View on GitHub <ExternalLink size={14} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Contact</h3>
            <p className="text-lg text-slate-600">Let's connect!</p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Send me a message</CardTitle>
                <CardDescription className="text-slate-600">
                  I'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  action="https://formspree.io/f/xpwzkkld"
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                      placeholder="Tell me about your project, question, or just say hello!"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Mail size={18} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a 
              href="https://github.com/Pierry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200/50"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 text-white group-hover:scale-110 transition-transform">
                <Github size={24} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">GitHub</p>
                <p className="text-sm text-slate-600">@pierry</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>

            <a 
              href="https://www.linkedin.com/in/pierryborges/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200/50"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">LinkedIn</p>
                <p className="text-sm text-slate-600">Connect with me</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" />
            </a>

            <a 
              href="mailto:pieerry@gmail.com" 
              className="group flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200/50"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <p className="text-sm text-slate-600">Get in touch</p>
              </div>
              <ChevronRight size={20} className="ml-auto text-slate-400 group-hover:text-purple-600 transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-600">
            © 2025 Pierry Borges. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;