
import { useState, useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  link?: string;
}

const ProjectCard = ({ title, description, imageSrc, tags, link }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setIsImageLoaded(true);
    }
  }, []);

  return (
    <div 
      className="card-hover rounded-xl overflow-hidden border bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse w-full h-full bg-muted"></div>
          </div>
        )}
        <img 
          ref={imageRef}
          src={imageSrc} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 ease-out",
            isHovered ? "scale-105" : "scale-100",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-foreground/70 text-base mb-4">{description}</p>
        
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
          >
            View Project <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
