import { ArrowUpRight, Asterisk, MapPin } from 'lucide-react';
import Reveal from '../../components/Reveal';
const journey = [
  {
    date: 'JUL — SEP 2026',
    name: 'Maroc Modis / Triumph',
    title: 'Software Development Intern',
    description:
      'Built an employee learning platform with five user roles, course and quiz workflows, certificates, and centralized progress reporting.',
    badge: 'INDUSTRY',
  },
  {
    date: 'JUL — AUG 2025',
    name: 'SavoirExpert',
    title: 'Software Development Intern',
    description:
      'Developed a document-readiness tracking platform to help accounting staff see statuses, pending work, and follow-up priorities in one place.',
    badge: 'INDUSTRY',
  },
  {
    date: '2022 — 2027 · EXPECTED',
    name: 'ENSA Al Hoceima',
    title: 'Engineering Degree · Digital Transformation & AI',
    description:
      'Building a foundation across software engineering, artificial intelligence, data systems, and the processes that connect them. Expected graduation: September 2027.',
    badge: 'EDUCATION',
  },
];
export default function AboutSection() {
  return (
    <section id="about" className="section-container section-space about-section">
      <Reveal>
        <div className="section-label">
          <span>03 / THE PERSON BEHIND THE CODE</span>
          <span>CURIOUS BY DEFAULT</span>
        </div>
      </Reveal>
      <div className="about-layout">
        <Reveal className="about-intro">
          <div className="about-monogram" aria-hidden="true">
            <span>sa.</span>
            <Asterisk size={66} strokeWidth={1} />
            <span className="monogram-note">
              A WORK IN PROGRESS.
              <br />
              AND PROUD OF IT.
            </span>
          </div>
          <div className="location-label">
            <MapPin size={14} /> Sefrou, Morocco <span>↗</span>
          </div>
        </Reveal>
        <Reveal className="about-story" delay={0.08}>
          <p className="eyebrow">HI, I’M SAAD.</p>
          <h2>
            A builder at heart.
            <br />
            <span className="serif">A student, always.</span>
          </h2>
          <p>
            I’m a final-year engineering student at ENSAH, studying Digital Transformation and
            Artificial Intelligence. What interests me most is the space between a real problem and
            something people can actually use.
          </p>
          <p>
            That has taken me from Darija text recognition to employee learning systems, from
            job-data pipelines to connected devices. Across two internships and a growing collection
            of projects, I’m learning to connect technical decisions with the people behind them.
          </p>
          <div className="about-facts">
            <div>
              <span>LOOKING FOR</span>
              <strong>A PFE engineering internship</strong>
            </div>
            <div>
              <span>LANGUAGES</span>
              <strong>Arabic · English C1 · French B2</strong>
            </div>
          </div>
          <a className="text-link" href="#contact">
            Let’s build something meaningful <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
      <div className="journey">
        <div className="journey-heading">
          <span className="eyebrow">THE JOURNEY SO FAR</span>
          <span>Learning by building.</span>
        </div>
        {journey.map((step) => (
          <Reveal key={step.name}>
            <article className="journey-row">
              <div className="journey-date">
                <span className="journey-dot" />
                {step.date}
              </div>
              <div className="journey-company">
                <h3>{step.name}</h3>
                <span>{step.title}</span>
              </div>
              <p>{step.description}</p>
              <span className="journey-badge">{step.badge}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
