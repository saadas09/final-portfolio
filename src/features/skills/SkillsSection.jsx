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
      <div className="section-container">
        <Reveal>
          <div className="section-label">
            <span>02 / DIFFERENT TOOLS. ONE MINDSET.</span>
            <span>CONNECT THE DOTS.</span>
          </div>
          <div className="skills-heading">
            <h2>
              Never just
              <br />
              <em>one thing.</em>
            </h2>
            <p>
              The interesting things happen
              <br />
              where disciplines overlap.
              <br />
              That’s where I like to work.
            </p>
            <span className="skills-star" aria-hidden="true">
              ✳
            </span>
          </div>
        </Reveal>
        <div className="expertise-layout">
          <div
            className="expertise-options"
            role="tablist"
            aria-label="Expertise areas"
            aria-orientation="vertical"
          >
            {expertise.map((entry, i) => (
              <button
                id={`expertise-tab-${entry.id}`}
                key={entry.id}
                className="expertise-option"
                role="tab"
                aria-selected={active === i}
                aria-controls="expertise-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  let next;
                  if (['ArrowDown', 'ArrowRight'].includes(e.key)) next = (i + 1) % 3;
                  if (['ArrowUp', 'ArrowLeft'].includes(e.key)) next = (i + 2) % 3;
                  if (e.key === 'Home') next = 0;
                  if (e.key === 'End') next = 2;
                  if (next !== undefined) {
                    e.preventDefault();
                    setActive(next);
                    document.getElementById(`expertise-tab-${expertise[next].id}`).focus();
                  }
                }}
              >
                <span>0{i + 1}</span>
                <strong>
                  {['Intelligence', 'Connection', 'Creation'][i]}
                  <small>{entry.label}</small>
                </strong>
                <ArrowUpRight size={28} />
              </button>
            ))}
            <span className="expertise-note">
              BUILT THROUGH PROJECTS.
              <br />
              STRENGTHENED THROUGH PRACTICE.
            </span>
          </div>
          <div
            id="expertise-panel"
            className="expertise-panel"
            role="tabpanel"
            aria-labelledby={`expertise-tab-${item.id}`}
            tabIndex={0}
          >
            <div className="expertise-panel-head">
              <span>MY TOOLKIT / {item.number}</span>
              <Icon size={32} strokeWidth={1.2} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
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
