
import { useState } from 'react';
import ProjectCard from './ProjectCard';

const CATEGORIES = ["All", "AI", "Mobile", "Web"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      title: "Devin",
      description: "Contributed to the development of Devin, an AI software engineer capable of solving complex programming tasks.",
      imageSrc: "https://images.unsplash.com/photo-1581092921461-7384206bf194?auto=format&fit=crop&w=1200&q=80",
      tags: ["AI", "Software Development", "Machine Learning"],
      category: "AI",
      link: "#"
    },
    {
      title: "MGX",
      description: "Worked on MGX, developing innovative solutions for enterprise-level applications with a focus on performance and scalability.",
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      tags: ["Software Development", "Enterprise", "Web"],
      category: "Web",
      link: "#"
    },
    {
      title: "Lovable",
      description: "Contributed to Lovable, an AI-powered development assistant that helps developers create and modify web applications through natural language.",
      imageSrc: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=1200&q=80",
      tags: ["AI", "Development Tools", "Web"],
      category: "AI",
      link: "#"
    },
    {
      title: "ChatGPT & Claude AI",
      description: "Experience working with and developing applications that leverage OpenAI's ChatGPT and Anthropic's Claude AI for various use cases.",
      imageSrc: "https://images.unsplash.com/photo-1677442135136-760c813a735e?auto=format&fit=crop&w=1200&q=80",
      tags: ["AI", "NLP", "Machine Learning"],
      category: "AI",
      link: "#"
    }
  ];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section-container bg-accent/30">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <span className="text-sm font-medium text-primary inline-block mb-3">Portfolio</span>
        <h2 className="mb-6">Selected Work</h2>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          Browse through a collection of my experience and contributions across AI solutions and mobile development projects.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 rounded-lg bg-background border">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div 
            key={index}
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
          >
            <ProjectCard 
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              tags={project.tags}
              link={project.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
