import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { projects, filters } from '../../data/portfolioData';
import ProjectEvidence from './components/ProjectEvidence';
import ProjectDialog from './components/ProjectDialog';
import Reveal from '../../components/Reveal';
const titles = [
  <>
    Opportunity.
    <br />
    Reimagined.
  </>,
  <>
    Learning.
    <br />
    Without limits.
  </>,
  <>
    Our language.
    <br />
    Machine readable.
  </>,
  <>
    Knowledge.
    <br />
    In conversation.
  </>,
];
export default function ProjectsSection() {
  const [selected, setSelected] = useState(
    () =>
      projects.find((p) => p.id === new URLSearchParams(window.location.search).get('project')) ||
      null,
  );
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState('All work');
  const visible = projects.filter((p) => filter === 'All work' || p.categories.includes(filter));
  return (
    <>
      <section className="manifesto">
        <div className="section-label">
          <span>THE IDEA IS JUST THE BEGINNING.</span>
          <span>
            KEEP GOING <ArrowDown size={14} />
          </span>
        </div>
        <p>
          {'I connect intelligence, data & software to make the complicated feel effortless.'
            .split(' ')
            .map((word, i) => (
              <span className="manifesto-word" key={i}>
                {word}{' '}
              </span>
            ))}
          <span className="manifesto-star" aria-hidden="true">
            ✳
          </span>
        </p>
        <div className="manifesto-bottom">
          <span>
            THOUGHTFULLY ENGINEERED.
            <br />
            RELENTLESSLY CURIOUS.
          </span>
          <span>
            From the first “what if”
            <br />
            to something that works.
          </span>
        </div>
      </section>
      <section id="projects" className="work-section section-container">
        <Reveal>
          <div className="section-label">
            <span>01 / SELECTED EXPLORATIONS</span>
            <span>IDEA → SYSTEM → EXPERIENCE</span>
          </div>
          <div className="work-heading">
            <h2>
              Proof of
              <br />
              <em>curiosity.</em>
              <sup>(04)</sup>
            </h2>
            <p>
              Real problems. Different disciplines.
              <br />A few things I’ve helped bring to life.
              <br />
              <a href="#project-index" className="text-link">
                See the full project index <ArrowDown size={15} />
              </a>
            </p>
          </div>
        </Reveal>
        <div className="featured-stack">
          {projects.slice(0, 4).map((project, i) => (
            <article
              className={`feature-card feature-${project.visual}`}
              key={project.id}
              style={{ '--card-index': i }}
            >
              <div className="feature-surface">
                <div className="feature-info">
                  <div className="feature-top">
                    <span>EXPLORATION / 0{i + 1}</span>
                    <span>{project.role}</span>
                  </div>
                  <h3>{titles[i]}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button
                    className="project-open"
                    onClick={() => setSelected(project)}
                    aria-label={`Explore ${project.title}`}
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight size={25} />
                  </button>
                </div>
                <div className="feature-art">
                  <ProjectEvidence project={project} />
                  <span className="visual-caption">
                    {project.id === 'lms'
                      ? 'ORIGINAL APPLICATION / LOCAL CAPTURE'
                      : project.id === 'darija'
                        ? 'ORIGINAL OCR INPUT / REPOSITORY ARTIFACT'
                        : `${project.title.toUpperCase()} / CONCEPT PREVIEW`}
                  </span>
                  <span className="art-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="project-index" id="project-index">
          <div className="index-heading">
            <div>
              <span className="eyebrow">THERE’S MORE WHERE THAT CAME FROM</span>
              <h3>
                The project index<span>({projects.length})</span>
              </h3>
            </div>
            <button
              className="index-toggle"
              aria-expanded={expanded}
              aria-controls="index-content"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Close index' : `Explore all ${projects.length} projects`}
              {expanded ? <Minus /> : <Plus />}
            </button>
          </div>
          <div id="index-content" hidden={!expanded}>
            <div className="project-filters" aria-label="Filter projects">
              {filters.map((f) => (
                <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f}
                </button>
              ))}
              <span role="status">{visible.length} PROJECTS</span>
            </div>
            <div className="index-list">
              {visible.map((project, i) => (
                <button
                  key={project.id}
                  className="index-row"
                  onClick={() => setSelected(project)}
                  aria-label={`Read ${project.title}`}
                >
                  <span className="index-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="index-name">
                    {project.title}
                    <small>{project.subtitle}</small>
                  </span>
                  <span className="index-category">{project.categories.join(' / ')}</span>
                  <ArrowUpRight size={24} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <ProjectDialog
          project={selected}
          onClose={() => {
            setSelected(null);
            if (new URLSearchParams(window.location.search).has('project')) {
              const url = new URL(window.location.href);
              url.searchParams.delete('project');
              window.history.replaceState({}, '', url);
            }
          }}
        />
      </section>
    </>
  );
}
