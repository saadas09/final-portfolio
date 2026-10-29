import HeroSection from '../features/hero/HeroSection';
import ProjectsSection from '../features/projects/ProjectsSection';
import SkillsSection from '../features/skills/SkillsSection';
import AboutSection from '../features/about/AboutSection';
import ResumeSection from '../features/resume/ResumeSection';
import ContactSection from '../features/contact/ContactSection';
import ScrollEffects from '../components/ScrollEffects';
import ProfileIntro from '../features/about/ProfileIntro';
export default function Home() {
  return (
    <>
      <HeroSection />
      <ProfileIntro />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ResumeSection />
      <ContactSection />
      <ScrollEffects />
    </>
  );
}
