import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "../../components/ui/SectionWrapper";
import { projects } from "../../data/portfolioData";
import { filterByCategory } from "../../utils/filterByCategory";
import ProjectCard from "./components/ProjectCard";
import ProjectFilters from "./components/ProjectFilters";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    return filterByCategory(projects, activeFilter);
  }, [activeFilter]);

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      subtitle="Academic and personal projects spanning AI, full-stack, IoT, and digital transformation."
    >
      <ProjectFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center text-sm text-[var(--muted)]"
        >
          No projects found for this filter.
        </motion.p>
      )}
    </SectionWrapper>
  );
}
