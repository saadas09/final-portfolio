import { motion } from "framer-motion";
import SectionWrapper from "../../components/ui/SectionWrapper";
import SkillPill from "./components/SkillPill";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiKeras,
  SiOpencv,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiLangchain,
  SiHuggingface,
  SiFastapi,
  SiFlask,
  SiLaravel,
  SiPhp,
  SiSpringboot,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiFirebase,
  SiApachekafka,
  SiApachespark,
  SiQt,
  SiOpenjdk,
  SiVscodium,
} from "react-icons/si";
import { FaMicrosoft, FaDatabase, FaCloud } from "react-icons/fa";
import { Globe, Cpu } from "lucide-react";
import { cinematicEase } from "../../utils/motion";

/* ── All 43 technologies ── */
const allSkills = [
  { name: "Python", icon: SiPython },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "PyTorch", icon: SiPytorch },
  { name: "Keras", icon: SiKeras },
  { name: "OpenCV", icon: SiOpencv },
  { name: "Scikit-learn", icon: SiScikitlearn },
  { name: "Pandas", icon: SiPandas },
  { name: "NumPy", icon: SiNumpy },
  { name: "LangChain", icon: SiLangchain },
  { name: "RAG", icon: Cpu },
  { name: "LLMs", icon: Cpu },
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Flask", icon: SiFlask },
  { name: "Laravel", icon: SiLaravel },
  { name: "PHP", icon: SiPhp },
  { name: "Java", icon: SiOpenjdk },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Bootstrap", icon: SiBootstrap },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "SQL", icon: FaDatabase },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Linux", icon: SiLinux },
  { name: "Firebase", icon: SiFirebase },
  { name: "REST APIs", icon: Globe },
  { name: "PySide6", icon: SiQt },
  { name: "Kafka", icon: SiApachekafka },
  { name: "Spark", icon: SiApachespark },
  { name: "Azure", icon: FaMicrosoft },
  { name: "Oracle Cloud", icon: FaCloud },
  { name: "VS Code", icon: SiVscodium },
];

export default function SkillsSection() {
  /* Duplicate 4× for seamless infinite loop */
  const repeated = [...allSkills, ...allSkills, ...allSkills, ...allSkills];

  return (
    <SectionWrapper
      id="skills"
      eyebrow="Skills"
      title="Tech Stack"
      subtitle="Technologies I use to design, build, and deploy AI-powered applications."
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: cinematicEase }}
      >
        {/* Single marquee row */}
        <div className="marquee-container relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent sm:w-20 md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent sm:w-20 md:w-28" />

          <div className="marquee-track animate-marquee-left flex w-max gap-3 md:gap-4">
            {repeated.map((skill, i) => (
              <SkillPill key={`${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
