import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Pause, Play, X } from 'lucide-react';
import { useMotion } from './MotionProvider';
const links = [
  ['About', 'about'],
  ['Work', 'projects'],
  ['Experience', 'experience'],
  ['Expertise', 'skills'],
  ['CVs', 'resumes'],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef(null);
  const { enabled, toggle } = useMotion();
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    const key = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (open) button.current?.focus();
      }
    };
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('keydown', key);
    };
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-shell">
        <a
          href="#hero"
          className="wordmark"
          aria-label="Saad Abs, home"
          onClick={() => setOpen(false)}
        >
          s<span className="logo-star">✳</span>a
          <span className="wordmark-note">
            SAAD ABS
            <br />
            ENGINEERING & EXPLORATION
          </span>
        </a>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`main-nav ${open ? 'is-open' : ''}`}
        >
          {links.map(([label, id], i) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
              <sup>0{i + 1}</sup>
              {label}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <div className="nav-controls">
          <button
            className="motion-toggle"
            onClick={toggle}
            aria-label={enabled ? 'Pause animations' : 'Enable animations'}
            title={enabled ? 'Pause animations' : 'Enable animations'}
          >
            {enabled ? <Pause size={14} /> : <Play size={14} />}
            <span>MOTION {enabled ? 'ON' : 'OFF'}</span>
          </button>
          <button
            ref={button}
            className="menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
