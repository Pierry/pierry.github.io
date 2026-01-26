import { useState } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Navigation - Minimal, Joel Becker inspired */}
      <nav className="fixed top-0 w-full bg-[#F5F5F7]/95 backdrop-blur-sm z-50">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg font-medium text-slate-900 hover:text-slate-700 transition-colors">
              Pierry Borges
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                CV
              </a>
              <a
                href="mailto:pieerry@gmail.com"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 hover:bg-slate-200/50 transition-colors rounded"
            >
              {mobileMenuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2 space-y-2 border-t border-slate-200 pt-4">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-slate-600 hover:text-slate-900 transition-colors py-1"
              >
                CV
              </a>
              <a
                href="mailto:pieerry@gmail.com"
                className="block text-sm text-slate-600 hover:text-slate-900 transition-colors py-1"
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
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
            Hey, I'm Pierry.
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-4">
            Engineering Manager focused on delivering real value through technology, understanding what users truly need, and helping teams reach their full potential.
          </p>

          <p className="text-base text-slate-500 leading-relaxed mb-6">
            14 years shipping software across fintech, healthtech, and logistics. Currently leading
            engineering at Intelipost and building{" "}
            <a href="https://spacemetrics.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              SpaceMetrics.ai
            </a>
            , a platform for engineering delivery metrics. I'm also maintaining an open-source{" "}
            <a href="https://github.com/space-metrics-ai/engineering-delivery-playbook" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Engineering Delivery Playbook
            </a>
            .
          </p>

          <p className="text-base text-slate-500 leading-relaxed mb-8">
            I care about system design, mobile development (Android, iOS, Flutter),
            architecture, distributed systems, AI-assisted coding, and helping teams
            deliver better software.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Pierry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/pierryborges/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-6">
            Experience
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-slate-900">Intelipost</span>
              <span className="text-sm text-slate-500">Engineering Manager, 2023–Present</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-slate-900">PicPay</span>
              <span className="text-sm text-slate-500">Engineering Manager, 2022–2023</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-slate-900">Grupo Fleury</span>
              <span className="text-sm text-slate-500">Engineering Manager, 2018–2022</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-slate-900">4bus</span>
              <span className="text-sm text-slate-500">Mobile Architect, 2018</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-slate-900">Expense Mobi</span>
              <span className="text-sm text-slate-500">Technical Lead, 2016–2018</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <span className="text-base text-slate-900">Deloitte</span>
              <span className="text-sm text-slate-500">Mobile Engineer, 2016</span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-6">
            Projects
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://spacemetrics.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-slate-900 hover:text-blue-600 transition-colors"
              >
                SpaceMetrics.ai
              </a>
              <span className="text-sm text-slate-500">Engineering delivery analytics</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://github.com/space-metrics-ai/engineering-delivery-playbook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-slate-900 hover:text-blue-600 transition-colors"
              >
                Engineering Delivery Playbook
              </a>
              <span className="text-sm text-slate-500">Open source</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://apps.apple.com/us/app/how-much-i-run/id6748591105"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-slate-900 hover:text-blue-600 transition-colors"
              >
                How Much I Run
              </a>
              <span className="text-sm text-slate-500">iOS App</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <a
                href="https://todone.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-slate-900 hover:text-blue-600 transition-colors"
              >
                Todone
              </a>
              <span className="text-sm text-slate-500">Task management app</span>
            </div>
          </div>
        </section>

        {/* Open-source Apps Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-6">
            Open-source Apps
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://meeting-messaging-app.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  Meeting Message
                </a>
                <a
                  href="https://github.com/Pierry/meeting-messaging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                >
                  View Code
                </a>
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                A simple messaging app for meetings and team communication.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://where-i-would-have-been-born.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  Where I Would Have Been Born
                </a>
                <a
                  href="https://github.com/Pierry/where-i-would-have-been-born"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                >
                  View Code
                </a>
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                A fun visualization that shows where in the world you would have been born based on global population distribution at your birth date.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://plugins.jetbrains.com/plugin/26878-cloud-dancer-theme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  Cloud Dancer Theme
                </a>
                <a
                  href="https://github.com/Pierry/cloud-dancer-theme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                >
                  View Code
                </a>
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                A serene, light theme for JetBrains IDEs inspired by Pantone's 2026 Color of the Year.
              </p>
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-6">
            Recommended
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <a
                  href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  State of AI in Business 2025
                </a>
                <span className="text-sm text-slate-500">Jan 2025</span>
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                A comprehensive report on how companies are adopting AI across industries.
                Great insights on trends, challenges, and what's coming next.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer - Minimal */}
      <footer className="border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Pierry Borges
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Pierry"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/pierryborges/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 transition-colors"
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
