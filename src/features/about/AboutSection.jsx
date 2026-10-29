import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/Reveal';
const journey = [
  {
    date: 'JUL — SEP 2026',
    name: 'Maroc Modis / Triumph',
    title: 'Software Development Intern',
    description:
      'Built an employee learning platform with five user roles, courses, quizzes, certificates, and centralized progress reporting.',
    label: 'INDUSTRY',
    project: 'lms',
  },
  {
    date: 'JUL — AUG 2025',
    name: 'SavoirExpert',
    title: 'Software Development Intern',
    description:
      'Developed a document-readiness tracking platform, bringing statuses, pending work, and staff follow-up into one place.',
    label: 'INDUSTRY',
    project: 'savoirexpert',
  },
  {
    date: '2022 — 2027 · EXPECTED',
    name: 'ENSA Al Hoceima',
    title: 'Engineering · Digital Transformation & AI',
    description:
      'Software engineering, artificial intelligence, and data systems. Expected graduation: September 2027.',
    label: 'EDUCATION',
  },
];
export default function AboutSection() {
  return (
    <section
      id="experience"
      className="experience-section section-container"
      aria-labelledby="experience-title"
    >
      <Reveal>
        <div className="section-label">
          <span>03 / EXPERIENCE & EDUCATION</span>
          <span>LEARNING BY BUILDING.</span>
        </div>
        <div className="experience-heading">
          <h2 id="experience-title">
            From the classroom.
            <br />
            <em>Into the real world.</em>
          </h2>
          <p>
            Two internships, a growing body of projects, and an engineering degree in progress.
            Here’s where I’ve put the learning to work.
          </p>
        </div>
      </Reveal>
      <div className="journey">
        <div className="journey-heading">
          <span className="eyebrow">A FEW STEPS ALONG THE WAY</span>
          <span>STILL JUST GETTING STARTED.</span>
        </div>
        {journey.map((step, i) => (
          <Reveal key={step.name}>
            <article className="journey-row">
              <span className="journey-number">0{i + 1}</span>
              <div className="journey-company">
                <span>{step.date}</span>
                <h3>{step.name}</h3>
                <p>{step.title}</p>
              </div>
              <div className="journey-description">
                <p>{step.description}</p>
                {step.project && (
                  <button
                    className="text-link"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent('portfolio:open-project', { detail: step.project }),
                      )
                    }
                  >
                    Explore the project <ArrowUpRight size={15} />
                  </button>
                )}
              </div>
              <span className="journey-badge">{step.label}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
