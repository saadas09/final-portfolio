import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import ChromeSculpture from '../../components/ChromeSculpture';
import { useMotion } from '../../components/MotionProvider';
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
    <section id="hero" className="hero" ref={ref}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-top hero-enter">
        <span className="mono">
          <i className="status-dot" /> OPEN FOR A PFE INTERNSHIP
        </span>
        <span className="mono hero-edition">BASED IN MOROCCO · BUILT FOR WHAT’S NEXT</span>
      </div>
      <div className="hero-intro hero-enter">
        <span className="eyebrow">AI / DATA / SOFTWARE</span>
        <p>
          Curious mind.
          <br />
          Restless builder.
          <br />
          <span>Endless possibilities.</span>
        </p>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <span>IDEAS INTO IMPACT</span>
        <i />
        <b>+</b>
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
  );
}
