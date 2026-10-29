import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Plus, Minus, Bookmark } from 'lucide-react';
import { projects } from '../../data/portfolioData';
import ProjectEvidence from './components/ProjectEvidence';
import ProjectDialog from './components/ProjectDialog';
import Reveal from '../../components/Reveal';
import ProjectExplorer from './components/ProjectExplorer';
const titles = [
  'Opportunity, reimagined.',
  'Learning without limits.',
  'Our language, machine readable.',
  'Knowledge in conversation.',
];
export default function ProjectsSection() {
  const [selected, setSelected] = useState(
    () =>
      projects.find((p) => p.id === new URLSearchParams(window.location.search).get('project')) ||
      null,
  );
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(() => {
    try {
      const value = JSON.parse(localStorage.getItem('saad-project-shortlist') || '[]');
      return Array.isArray(value)
        ? value.filter((id) => projects.some((p) => p.id === id)).slice(0, 14)
        : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('saad-project-shortlist', JSON.stringify(saved));
    } catch {
      /* Saving remains available for this visit. */
    }
  }, [saved]);
  const toggleSave = (id) =>
    setSaved((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
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
        <div className="featured-stack art-gallery">
          {projects.slice(0, 4).map((project, i) => (
            <article
              className={`feature-card feature-${project.visual}`}
              key={project.id}
              style={{ '--card-index': i }}
              data-reveal
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
                  <span className="visual-caption">AI-GENERATED CONCEPT ART / 0{i + 1}</span>
                  <button
                    className="art-bookmark"
                    aria-label={`${saved.includes(project.id) ? 'Unsave' : 'Save'} featured ${project.title}`}
                    aria-pressed={saved.includes(project.id)}
                    onClick={() => toggleSave(project.id)}
                  >
                    <Bookmark
                      size={18}
                      fill={saved.includes(project.id) ? 'currentColor' : 'none'}
                    />
                    <span>{saved.includes(project.id) ? 'Saved' : 'Save'}</span>
                  </button>
                  <span className="art-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {saved.length > 0 && (
          <button
            className="collection-shortcut"
            onClick={() => {
              setExpanded(true);
              document.getElementById('project-index').scrollIntoView();
            }}
          >
            <Bookmark size={16} /> Your collection ({saved.length}) <span>Compare & explore ↗</span>
          </button>
        )}
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
            <ProjectExplorer saved={saved} toggleSave={toggleSave} onOpen={setSelected} />
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
