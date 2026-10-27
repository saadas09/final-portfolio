import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import Reveal from '../../components/Reveal';
export default function ContactSection() {
  const [copyState, setCopyState] = useState('');
  const timeout = useRef(null);
  useEffect(() => () => clearTimeout(timeout.current), []);
  async function copyEmail() {
    clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopyState('Email copied');
    } catch {
      setCopyState('Select the email address below to copy it.');
    }
    timeout.current = setTimeout(() => setCopyState(''), 4500);
  }
  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <Reveal>
          <div className="section-label">
            <span>05 / WHAT’S NEXT?</span>
            <span>
              <span className="status-dot" /> OPEN TO OPPORTUNITIES
            </span>
          </div>
          <div className="contact-main">
            <h2>
              Good things start
              <br />
              with a <span className="serif">conversation.</span>
            </h2>
            <a
              href={`mailto:${personal.email}`}
              className="contact-arrow"
              aria-label="Email Saad Abs"
            >
              <ArrowUpRight size={57} strokeWidth={1.2} />
            </a>
          </div>
          <div className="contact-bottom">
            <div>
              <p>
                A PFE internship, an interesting problem, or an idea worth exploring.
                <br /> I’d love to hear about it.
              </p>
              <div className="email-row">
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
                <button className="copy-email" onClick={copyEmail} aria-label="Copy email address">
                  {copyState === 'Email copied' ? <Check size={17} /> : <Copy size={17} />}
                </button>
              </div>
              <p className="copy-status" role="status">
                {copyState}
              </p>
            </div>
            <div className="contact-socials">
              <a href={personal.github} target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub <ArrowUpRight size={16} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={17} /> LinkedIn <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
