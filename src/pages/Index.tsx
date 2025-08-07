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
import { Link } from "react-router-dom";
import { getMonthYear } from "@/utils/dateUtils";
import { estimateReadingTime, estimateReadingTimeFromMarkdown } from "@/utils/readingTime";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("articles");

  // Medium-inspired layout below

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-gray-900">
              Pierry Borges
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection("articles")}
                className={`text-sm font-normal transition-colors ${
                  activeSection === "articles" 
                    ? "text-gray-900 border-b-2 border-gray-900 pb-1" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Stories
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className={`text-sm font-normal transition-colors ${
                  activeSection === "projects" 
                    ? "text-gray-900 border-b-2 border-gray-900 pb-1" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className={`text-sm font-normal transition-colors ${
                  activeSection === "contact" 
                    ? "text-gray-900 border-b-2 border-gray-900 pb-1" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                About
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 transition-colors rounded"
            >
              {mobileMenuOpen ? <X size={20} className="text-gray-600" /> : <Menu size={20} className="text-gray-600" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-gray-200 pt-4">
              <button 
                onClick={() => scrollToSection("articles")}
                className="block w-full text-left px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors"
              >
                Stories
              </button>
              <button 
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </button>
            </div>
          )}
        </div>
      </nav>


      {/* Articles Section - Medium Style */}
      <section id="articles" className="pt-24 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-normal text-gray-900 mb-2 tracking-tight">
              Latest stories
            </h2>
            <p className="text-base text-gray-600 font-normal">
              Thoughts on technology, AI, and software development
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-12">
            {articles.length === 0 && (
              <div className="text-gray-600">No articles yet. Add a new <code className="bg-gray-100 px-1 rounded">.md</code> file into <code className="bg-gray-100 px-1 rounded">src/articles/</code>.</div>
            )}
            {articles.map((article) => {
              const minutes = article.markdown
                ? estimateReadingTimeFromMarkdown(article.markdown as string)
                : estimateReadingTime(article.content);
              return (
              <article key={article.slug} className="group">
                {/* Article Header */}
                <div className="mb-6">
                  {/* Author and Meta Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">P</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Pierry Borges</span>
                      <span>·</span>
                      <span>{getMonthYear(article.createdAt)}</span>
                      <span>·</span>
                      <span>{minutes} min read</span>
                    </div>
                  </div>

                  {/* Title and Description */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors">
                <Link to={`/article/${article.slug}`} className="hover:underline">
                  {article.title}
                </Link>
              </h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>

                {/* Article Content */}
                {/* Markdown articles are shown on their own page; home shows preview only */}

                {/* Article Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Published {getMonthYear(article.createdAt)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {minutes} min read
                    </div>
                  </div>
                </div>
              </article>
            );})}
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