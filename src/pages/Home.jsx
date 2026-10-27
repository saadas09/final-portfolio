import HeroSection from '../features/hero/HeroSection';
import ProjectsSection from '../features/projects/ProjectsSection';
import SkillsSection from '../features/skills/SkillsSection';
import AboutSection from '../features/about/AboutSection';
import ResumeSection from '../features/resume/ResumeSection';
import ContactSection from '../features/contact/ContactSection';
export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
