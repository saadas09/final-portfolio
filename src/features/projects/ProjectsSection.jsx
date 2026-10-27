import { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight } from 'lucide-react';
import { filters, projects } from '../../data/portfolioData';
import Reveal from '../../components/Reveal';
import ProjectVisual from './components/ProjectVisual';
import ProjectDialog from './components/ProjectDialog';

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All work');
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);
  const firstExtra = useRef(null);
  const filtered = projects.filter(
    (project) => filter === 'All work' || project.categories.includes(filter),
  );
  const visible = expanded ? filtered : filtered.slice(0, 6);
  function toggleExpanded() {
    if (expanded) {
      setExpanded(false);
      document.getElementById('project-filters').scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    } else {
      setExpanded(true);
      requestAnimationFrame(() => firstExtra.current?.focus({ preventScroll: true }));
    }
  }
  return (
    <section id="projects" className="work-section section-container section-space">
      <Reveal>
        <div className="section-label">
          <span>01 / SELECTED WORK</span>
          <span>IDEAS INTO REALITY</span>
        </div>
        <div className="section-heading">
          <h2>
            A curious mind.
            <br />
            <span className="serif">A growing body of work.</span>
          </h2>
          <p>
            From a first line of code to systems with purpose. A selection of things I’ve built,
            explored, and learned from.
          </p>
        </div>
      </Reveal>
      <div className="work-toolbar" id="project-filters">
        <div className="project-filters" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              aria-pressed={filter === item}
              className={filter === item ? 'selected' : ''}
              onClick={() => {
                setFilter(item);
                setExpanded(false);
              }}
            >
              {item}
              {filter === item && <span>{filtered.length.toString().padStart(2, '0')}</span>}
            </button>
          ))}
        </div>
        <span className="work-count" aria-live="polite">
          {visible.length} of {filtered.length} projects
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 0.07}>
            <article className="project-card">
              <div className={`project-preview color-${project.color}`}>
                <div className="preview-top">
                  <span>{project.type}</span>
                  <span>{(projects.indexOf(project) + 1).toString().padStart(2, '0')}</span>
                </div>
                <ProjectVisual kind={project.visual} />
                <span className="visual-caption">PROJECT CONCEPT VISUAL</span>
                <span className="project-open-icon">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="project-info">
                <div>
                  <h3>
                    <button
                      ref={index === 6 ? firstExtra : null}
                      onClick={() => setSelected(project)}
                      aria-label={`Explore ${project.title}`}
                    >
                      {project.title}
                    </button>
                  </h3>
                  <p>{project.subtitle}</p>
                </div>
                <span className="project-role">
                  {project.role.startsWith('Software development internship')
                    ? 'Internship'
                    : project.role}
                </span>
              </div>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {filtered.length > 6 && (
        <div className="more-work">
          <span>There’s more where that came from.</span>
          <button
            className="button button-outline"
            onClick={toggleExpanded}
            aria-expanded={expanded}
          >
            {expanded ? 'Show selected work' : `Explore all ${filtered.length} projects`}
            {expanded ? <ArrowUp size={17} /> : <ArrowDown size={17} />}
          </button>
        </div>
      )}
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
