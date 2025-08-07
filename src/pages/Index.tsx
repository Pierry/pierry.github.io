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
            <p className="text-lg text-slate-600">Open source work and contributions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Coming Soon</CardTitle>
                <CardDescription className="text-slate-600">
                  New projects will be added here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  This section will be updated with interesting projects and open source contributions.
                </p>
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
      <footer className="py-8 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-400">
            © 2025 Pierry Borges. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;