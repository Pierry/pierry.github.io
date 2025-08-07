
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      window.scrollTo({
        top: servicesSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.05),transparent_50%)]"></div>
      
      <div className="max-w-5xl mx-auto text-center">
        <div className="animate-fade-down opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            Mobile & AI Developer
          </span>
        </div>
        
        <h1 className="animate-fade-up opacity-0 [animation-delay:0.5s] [animation-fill-mode:forwards] mb-6 font-semibold">
          Crafting Digital Experiences<br className="hidden md:block" /> With Purpose
        </h1>
        
        <p className="animate-fade-up opacity-0 [animation-delay:0.7s] [animation-fill-mode:forwards] max-w-2xl mx-auto text-foreground/80 mb-10">
          I specialize in developing AI solutions and mobile applications that solve real problems. With expertise in Android, iOS, and Flutter, I help bring your ideas to life.
        </p>
        
        <div className="animate-fade-up opacity-0 [animation-delay:0.9s] [animation-fill-mode:forwards]">
          <button 
            onClick={scrollToServices}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full transition-all duration-300 ease-in-out button-hover shadow-md"
          >
            Explore My Work
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce animate-fade-in opacity-0 [animation-delay:1.5s] [animation-fill-mode:forwards]">
        <button 
          onClick={scrollToServices}
          className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
