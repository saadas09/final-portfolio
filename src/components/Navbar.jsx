import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
const links = [
  ['Work', 'projects'],
  ['Expertise', 'skills'],
  ['About', 'about'],
  ['CV library', 'resumes'],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-15% 0px -60% 0px' },
    );
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
    const close = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', close);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a
          className="wordmark"
          href="#hero"
          aria-label="Saad Abs, home"
          onClick={() => setOpen(false)}
        >
          saad abs<span className="brand-dot">✳</span>
        </a>
        <nav
          className={open ? 'main-nav is-open' : 'main-nav'}
          aria-label="Main navigation"
          id="main-navigation"
        >
          {links.map(([label, id]) => (
            <a
              href={`#${id}`}
              key={id}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
