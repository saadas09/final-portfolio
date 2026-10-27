import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Asterisk,
  BrainCircuit,
  Database,
  Code2,
} from 'lucide-react';
import Reveal from '../../components/Reveal';
import OrbitSculpture from '../../components/OrbitSculpture';
import { projects } from '../../data/portfolioData';
const disciplines = [
  {
    label: 'AI',
    title: 'Intelligence, applied.',
    text: 'Teaching machines to read, retrieve, and understand.',
    icon: BrainCircuit,
  },
  {
    label: 'Data',
    title: 'Connections, engineered.',
    text: 'From raw signals to systems that make sense.',
    icon: Database,
  },
  {
    label: 'Software',
    title: 'Ideas, made useful.',
    text: 'Thoughtful tools for real people and real workflows.',
    icon: Code2,
  },
];
export default function HeroSection() {
  const [focus, setFocus] = useState(0);
  const selected = disciplines[focus];
  const Icon = selected.icon;
  function moveLight(event) {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--glow-x',
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      '--glow-y',
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  }
  return (
    <section id="hero" className="hero section-container">
      <div className="hero-topline">
        <span>
          <span className="status-dot" /> OPEN TO PFE INTERNSHIPS
        </span>
        <span className="hero-location">BASED IN MOROCCO · BUILDING BEYOND</span>
      </div>
      <div className="hero-grid">
        <Reveal className="hero-copy">
          <p className="eyebrow">SAAD ABS / ENGINEERING STUDENT</p>
          <h1>
            Complex ideas.
            <br />
            Thoughtfully
            <br />
            <span className="serif blue-text">made useful.</span>
            <span className="title-spark">
              <Asterisk />
            </span>
          </h1>
          <p className="hero-description">
            I connect <strong>AI, data, and software</strong> to build things that help people.
            Final-year engineering student at ENSAH, with a curious mind and a builder’s instinct.
          </p>
          <div className="hero-actions">
            <a className="button button-blue" href="#projects">
              Explore my work <ArrowDown size={17} />
            </a>
            <a className="text-link" href="#resumes">
              Find your CV <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-proof">
            <span>
              <strong>{projects.length}</strong> projects & experiments
            </span>
            <span className="proof-divider" />
            <span>
              <strong>02</strong> industry internships
            </span>
          </div>
        </Reveal>
        <Reveal className="hero-art" delay={0.12} onPointerMove={moveLight}>
          <div className="art-meta">
            <span>
              <span className="small-cross">+</span> THE INTERSECTION OF
            </span>
            <span>01 — 03</span>
          </div>
          <div className="art-label art-label-top">
            <BrainCircuit size={14} /> HUMAN CURIOSITY
          </div>
          <OrbitSculpture focus={focus} />
          <div className="art-label art-label-bottom">
            ENGINEERING POSSIBILITY <ArrowUpRight size={15} />
          </div>
          <div className="art-caption" aria-live="polite">
            <Icon size={23} strokeWidth={1.3} />
            <div>
              <h2>{selected.title}</h2>
              <p>{selected.text}</p>
            </div>
          </div>
          <div className="art-controls" role="group" aria-label="Explore my disciplines">
            {disciplines.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setFocus(index)}
                aria-pressed={focus === index}
                className={focus === index ? 'selected' : ''}
              >
                {item.label}
                <span>0{index + 1}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <span>ENGINEERING WITH INTENTION.</span>
        <a href="#projects">
          A few things I’ve built <ArrowRight size={16} />
        </a>
        <span className="hero-bottom-right">
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </span>
      </div>
    </section>
  );
}
