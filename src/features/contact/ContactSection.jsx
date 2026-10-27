import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import Reveal from '../../components/Reveal';
export default function ContactSection() {
  const [status, setStatus] = useState('');
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copy() {
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(personal.email);
      setStatus('Email copied');
    } catch {
      setStatus('Select the email address to copy it.');
    }
    timeout.current = setTimeout(() => setStatus(''), 4500);
  }
  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <Reveal>
          <div className="section-label">
            <span>05 / GREAT THINGS START SOMEWHERE.</span>
            <span>
              <i className="status-dot" /> OPEN TO OPPORTUNITIES
            </span>
          </div>
          <div className="contact-main">
            <h2>
              Let’s make
              <br />
              <em>it matter.</em>
            </h2>
            <a
              className="contact-arrow"
              href={`mailto:${personal.email}`}
              aria-label="Email Saad Abs"
            >
              <ArrowUpRight strokeWidth={1} />
            </a>
          </div>
          <div className="contact-bottom">
            <div>
              <p>
                A PFE internship. A bold idea. An interesting problem.
                <br />
                I’m listening.
              </p>
              <div className="email-row">
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
                <button className="copy-email" onClick={copy} aria-label="Copy email address">
                  {status === 'Email copied' ? <Check size={19} /> : <Copy size={19} />}
                </button>
              </div>
              <p className="copy-status" role="status">
                {status}
              </p>
            </div>
            <div className="contact-socials">
              <a href={personal.github} target="_blank" rel="noreferrer">
                GitHub
                <ArrowUpRight size={20} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
