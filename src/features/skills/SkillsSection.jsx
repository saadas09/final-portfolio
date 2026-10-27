import { useState } from 'react';
import { ArrowUpRight, BrainCircuit, Code2, Database } from 'lucide-react';
import { expertise, projects } from '../../data/portfolioData';
import Reveal from '../../components/Reveal';
import ProjectDialog from '../projects/components/ProjectDialog';
const icons = [BrainCircuit, Database, Code2];

export default function SkillsSection() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const item = expertise[active];
  const Icon = icons[active];
  return (
    <section id="skills" className="expertise-section">
      <div className="section-container section-space">
        <Reveal>
          <div className="section-label">
            <span>02 / MY TOOLKIT</span>
            <span>ALWAYS A WORK IN PROGRESS</span>
          </div>
          <div className="section-heading">
            <h2>
              Different disciplines.
              <br />
              <span className="serif">One connected mindset.</span>
            </h2>
            <p>
              I like working where fields meet. Each discipline gives me a different way to solve
              the same question: how can this be more useful?
            </p>
          </div>
        </Reveal>
        <div className="expertise-layout">
          <div
            className="expertise-options"
            role="tablist"
            aria-label="Expertise areas"
            aria-orientation="vertical"
          >
            {expertise.map((entry, index) => (
              <button
                id={`expertise-tab-${entry.id}`}
                role="tab"
                aria-selected={active === index}
                aria-controls="expertise-panel"
                tabIndex={active === index ? 0 : -1}
                key={entry.id}
                className={active === index ? 'expertise-option selected' : 'expertise-option'}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  let next;
                  if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
                    next = (index + 1) % expertise.length;
                  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
                    next = (index + expertise.length - 1) % expertise.length;
                  if (event.key === 'Home') next = 0;
                  if (event.key === 'End') next = expertise.length - 1;
                  if (next !== undefined) {
                    event.preventDefault();
                    setActive(next);
                    document.getElementById(`expertise-tab-${expertise[next].id}`).focus();
                  }
                }}
              >
                <span>{entry.number}</span>
                <div>
                  <small>{entry.label}</small>
                  <h3>{entry.title}</h3>
                </div>
                <ArrowUpRight size={22} />
              </button>
            ))}
            <p className="expertise-note">Built through projects. Strengthened through practice.</p>
          </div>
          <div
            className="expertise-panel"
            id="expertise-panel"
            role="tabpanel"
            aria-labelledby={`expertise-tab-${item.id}`}
            tabIndex={0}
          >
            <div className="expertise-panel-head">
              <span>THE TOOLS BEHIND THE WORK</span>
              <Icon size={32} strokeWidth={1.3} />
            </div>
            <p className="expertise-description">{item.text}</p>
            <div className="skill-tags">
              {item.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <div className="foundations">
              <span>ALSO EXPLORING & STUDYING</span>
              <p>{item.foundations.join(' · ')}</p>
            </div>
            <div className="skills-in-practice">
              <span>SEE IT IN PRACTICE</span>
              {item.projectIds.map((id) => {
                const project = projects.find((p) => p.id === id);
                return (
                  <button key={id} onClick={() => setSelected(project)}>
                    {project.title}
                    <ArrowUpRight size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
