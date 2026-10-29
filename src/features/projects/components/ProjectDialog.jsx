import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import ProjectEvidence from './ProjectEvidence';
import CaseStudyDetails from './CaseStudyDetails';
import { personal } from '../../../data/portfolioData';

export default function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    const trigger = document.activeElement;
    const previous = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
      if (trigger instanceof HTMLElement && trigger.isConnected)
        trigger.focus({ preventScroll: true });
    };
  }, [project]);
  if (!project) return null;
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-panel">
        <div className="dialog-topbar">
          <span>PROJECT NOTES / {project.role}</span>
          <button className="icon-button" onClick={onClose} aria-label="Close project" autoFocus>
            <X size={22} />
          </button>
        </div>
        <div className={`dialog-visual color-${project.color}`}>
          <ProjectEvidence project={project} />
          <span className="visual-caption">
            {['findurway', 'lms', 'darija', 'rag'].includes(project.id)
              ? 'AI-GENERATED CONCEPT ART'
              : 'PROJECT CONCEPT VISUAL'}
          </span>
        </div>
        <div className="dialog-content">
          <p className="eyebrow">{project.type}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p className="dialog-intro">{project.description}</p>
          <div className="case-study-block">
            <span>01 / THE CHALLENGE</span>
            <p>{project.problem}</p>
          </div>
          <div className="case-study-block">
            <span>02 / MY CONTRIBUTION</span>
            <p>{project.contribution}</p>
          </div>
          <div className="case-study-block">
            <span>03 / HOW IT WORKS</span>
            <ul>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <CaseStudyDetails key={project.id} project={project} />
          <div className="tag-list dialog-tags">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="dialog-actions">
            {project.github ? (
              <a
                className="button button-blue"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> Explore the source <ArrowUpRight size={16} />
              </a>
            ) : (
              <a
                className="button button-blue"
                href={`mailto:${personal.email}?subject=${encodeURIComponent(`Let's talk about ${project.title}`)}`}
              >
                Ask me about this project <ArrowUpRight size={16} />
              </a>
            )}
            <button className="text-link" onClick={onClose}>
              Back to exploring
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
