
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md shadow-sm"  
          : "bg-transparent"
      )}
      style={{
        backgroundImage: !isScrolled ? "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#" 
          className="text-xl font-display font-semibold tracking-tight" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Pierry Borges
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Work</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center p-2 text-foreground" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[72px] bg-background/95 backdrop-blur-lg shadow-lg md:hidden transition-all duration-300 ease-in-out z-40 border-t",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="p-4 space-y-4 flex flex-col">
          <button onClick={() => scrollToSection('services')} className="py-2 px-4 text-left hover:bg-accent rounded-md transition-colors">Services</button>
          <button onClick={() => scrollToSection('projects')} className="py-2 px-4 text-left hover:bg-accent rounded-md transition-colors">Work</button>
          <button onClick={() => scrollToSection('contact')} className="py-2 px-4 text-left hover:bg-accent rounded-md transition-colors">Contact</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
