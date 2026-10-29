import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import ChromeSculpture from '../../components/ChromeSculpture';
import { useMotion } from '../../components/MotionProvider';
import { projects, resumes } from '../../data/portfolioData';
const modes = ['Intelligence', 'Connection', 'Creation'];
export default function HeroSection() {
  const [mode, setMode] = useState(0);
  const { enabled } = useMotion();
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!enabled) return;
    const ctx = gsap.context(() => {
      gsap.set('.hero-name > span', { yPercent: 110, rotate: 4 });
      gsap.set('.hero-enter', { opacity: 0, y: 25 });
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to('.hero-enter', { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.1)
        .to('.hero-name > span', { yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.15 }, 0.15);
    }, ref);
    return () => ctx.revert();
  }, [enabled]);
  return (
    <>
      <section id="hero" className="hero hero-refined" ref={ref}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-top hero-enter">
          <span className="mono">
            <i className="status-dot" /> OPEN FOR A PFE INTERNSHIP
          </span>
          <span className="mono hero-edition">BASED IN MOROCCO · BUILT FOR WHAT’S NEXT</span>
        </div>
        <div className="hero-intro hero-enter">
          <span className="eyebrow">ENGINEERING STUDENT / ENSAH</span>
          <p>
            Human problems.
            <br />
            Engineered
            <br />
            <span className="hero-answer">answers.</span>
          </p>
          <div className="hero-intro-actions">
            <a href="#projects">
              Explore my work <ArrowUpRight size={17} />
            </a>
            <a href={resumes[0].url} download={resumes[0].filename}>
              Get my CV <ArrowDown size={15} />
            </a>
          </div>
          <div className="hero-proof">
            <span>
              <strong>{projects.length}</strong> PROJECTS
            </span>
            <span>
              <strong>02</strong> INTERNSHIPS
            </span>
            <span>
              <strong>03</strong> DISCIPLINES
            </span>
          </div>
        </div>
        <div className="hero-field" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="field-label label-ai">01 / INTELLIGENCE</span>
          <span className="field-label label-data">02 / CONNECTION</span>
          <span className="field-label label-code">03 / CREATION</span>
        </div>
        <ChromeSculpture mode={mode} />
        <div className="sculpture-caption hero-enter">
          <span className="mono">
            FIG. 0{mode + 1} / {modes[mode].toUpperCase()}
          </span>
          <span className="drag-note">
            DRAG TO EXPLORE <MoveUpRight size={12} />
          </span>
        </div>
        <h1 className="hero-name" aria-label="Saad Abs">
          <span>SAAD</span>
          <span>
            ABS<span className="name-period">.</span>
          </span>
        </h1>
        <div className="hero-bottom hero-enter">
          <p>
            From Moroccan Darija to connected data, I build
            <br className="desktop-break" /> AI and software around real human problems.
          </p>
          <div className="hero-modes" aria-label="Choose a sculpture">
            <span className="mono">CHANGE THE PERSPECTIVE</span>
            <div>
              {['AI', 'Data', 'Software'].map((label, i) => (
                <button key={label} aria-pressed={mode === i} onClick={() => setMode(i)}>
                  <span>0{i + 1}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <a href="#projects" className="round-link">
            <span>
              EXPLORE
              <br />
              THE WORK
            </span>
            <ArrowDown size={21} />
          </a>
        </div>
        <a href="#contact" className="hero-side-link">
          LET’S BUILD SOMETHING <ArrowUpRight size={14} />
        </a>
      </section>
      <div className="hero-work-rail section-container">
        <div className="rail-label">
          <span className="eyebrow">START WITH SOMETHING REAL</span>
          <p>
            Three ways
            <br />
            into my work.
          </p>
          <ArrowDown size={20} />
        </div>
        {[
          { id: 'darija', label: 'Making Arabic text searchable', category: 'COMPUTER VISION' },
          {
            id: 'findurway',
            label: 'Connecting skills to opportunity',
            category: 'AI + DATA ENGINEERING',
          },
          { id: 'lms', label: 'Building better ways to learn', category: 'SOFTWARE ENGINEERING' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() =>
              window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: item.id }))
            }
            className="rail-project"
            aria-label={`Discover ${projects.find((p) => p.id === item.id).title}`}
          >
            <div className="rail-image">
              <img
                src={`/projects/art/${item.id}-product.webp`}
                alt=""
                width="1536"
                height="1024"
                loading="lazy"
              />
            </div>
            <span className="rail-copy">
              <small>{item.category}</small>
              <strong>{item.label}</strong>
            </span>
            <ArrowUpRight size={20} />
          </button>
        ))}
      </div>
    </>
  );
}
