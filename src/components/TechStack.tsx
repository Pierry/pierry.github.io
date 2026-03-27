import { DiJava } from "react-icons/di";
import {
  SiKotlin,
  SiPython,
  SiNodedotjs,
  SiGo,
  SiDotnet,
  SiAndroid,
  SiApple,
  SiFlutter,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const techs = [
  // Backend
  { icon: DiJava, name: "Java", color: "#ED8B00" },
  { icon: SiKotlin, name: "Kotlin", color: "#7F52FF" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiNodedotjs, name: "Node", color: "#339933" },
  { icon: SiGo, name: "Go", color: "#00ADD8" },
  { icon: SiDotnet, name: ".NET", color: "#512BD4" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  // Mobile
  { icon: SiAndroid, name: "Android", color: "#3DDC84" },
  { icon: SiApple, name: "iOS", color: "#999999" },
  { icon: SiFlutter, name: "Flutter", color: "#02569B" },
  { icon: SiKotlin, name: "KMP", color: "#7F52FF" },
  { icon: SiReact, name: "React Native", color: "#61DAFB" },
];

interface TechStackProps {
  lang: "en" | "pt";
}

export const TechStack = ({ lang }: TechStackProps) => {
  const intro = lang === "en" 
    ? "Hands-on experience across backend, mobile, and architecture, with a strong focus on real-world impact."
    : "Experiência prática em backend, mobile e arquitetura, com foco forte em impacto real.";

  return (
    <div className="space-y-4">
      <p className="text-base text-muted-foreground/80 leading-relaxed">
        {intro}
      </p>
      <div className="flex flex-wrap gap-2">
        {techs.map((tech) => (
          <span
            key={tech.name}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/50 hover:bg-accent transition-colors text-sm text-muted-foreground"
          >
            <tech.icon size={14} style={{ color: tech.color }} />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
