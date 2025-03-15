
import { useState } from 'react';
import { Smartphone, Braces, BrainCircuit } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
}

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services: Service[] = [
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile solutions",
      detailedDescription: "I create polished, high-performance mobile applications for iOS and Android using modern frameworks and native technologies. My expertise spans Flutter for cross-platform development and native development with Swift and Kotlin. I focus on creating intuitive user experiences, implementing complex features, and optimizing performance to deliver apps that stand out in the marketplace.",
      image: "/images/mobile-dev.jpg"
    },
    {
      icon: BrainCircuit,
      title: "AI Solutions",
      description: "Machine learning and AI integration",
      detailedDescription: "I specialize in bringing AI capabilities to your applications. From implementing natural language processing to creating custom machine learning models, I help businesses leverage the power of artificial intelligence. My solutions include chatbots, recommendation systems, predictive analytics, and AI-powered automation tools that transform data into valuable insights and enhance user experiences.",
      image: "/images/ai-solutions.jpg"
    },
    {
      icon: Braces,
      title: "Custom Development",
      description: "Tailored software solutions for unique needs",
      detailedDescription: "I develop bespoke software solutions designed specifically for your business requirements. Using the latest technologies and best practices, I create scalable, maintainable, and secure applications. My approach focuses on close collaboration, agile methodologies, and continuous improvement to deliver custom web applications, internal tools, and specialized systems that solve your unique challenges.",
      image: "/images/custom-dev.jpg"
    }
  ];

  const toggleService = (index: number) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <section id="services" className="section-container">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <span className="text-sm font-medium text-primary inline-block mb-3">Services</span>
        <h2 className="mb-6">Expert Services Tailored to Your Needs</h2>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          I specialize in creating customized solutions that solve real-world problems, from mobile app development to advanced AI implementations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index}
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out", 
              activeService === index 
                ? "shadow-lg border-primary/20" 
                : "hover:shadow-md hover:border-primary/10"
            )}
          >
            <div className="md:flex">
              <div className="md:w-2/5">
                <AspectRatio ratio={16/9} className="h-full">
                  <div className="w-full h-full overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                </AspectRatio>
              </div>
              
              <div className="md:w-3/5">
                <CardHeader>
                  <button 
                    className="w-full text-left flex items-start"
                    onClick={() => toggleService(index)}
                    aria-expanded={activeService === index}
                  >
                    <div className="mr-5 bg-primary/10 p-3 rounded-lg">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                      <p className="text-foreground/70 text-base">{service.description}</p>
                    </div>
                  </button>
                </CardHeader>
                
                <CardContent>
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      activeService === index 
                        ? "max-h-96 opacity-100" 
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="pt-3 border-t">
                      <p className="text-foreground/80">{service.detailedDescription}</p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Services;
