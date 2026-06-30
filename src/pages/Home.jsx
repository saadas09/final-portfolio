import { motion } from "framer-motion";
import AboutSection from "../features/about/AboutSection";
import ContactSection from "../features/contact/ContactSection";
import ExperienceSection from "../features/experience/ExperienceSection";
import HeroSection from "../features/hero/HeroSection";
import ProjectsSection from "../features/projects/ProjectsSection";
import SkillsSection from "../features/skills/SkillsSection";
import { sectionReveal } from "../utils/motion";

const sections = [
  { component: HeroSection, key: "hero" },
  { component: AboutSection, key: "about" },
  { component: ProjectsSection, key: "projects" },
  { component: SkillsSection, key: "skills" },
  { component: ExperienceSection, key: "timeline" },
  { component: ContactSection, key: "contact" },
];

/** Thin gradient line between sections — fades in on scroll */
function SectionDivider() {
  return (
    <motion.div
      className="mx-auto h-px w-2/3 max-w-xl bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    />
  );
}

export default function Home() {
  return (
    <>
      {sections.map(({ component: Section, key }, index) => (
        <div key={key}>
          {index > 0 && <SectionDivider />}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{ ...sectionReveal.transition, delay: index * 0.05 }}
          >
            <Section />
          </motion.div>
        </div>
      ))}
    </>
  );
}
