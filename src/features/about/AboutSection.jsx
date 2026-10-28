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
  },
  {
    date: 'JUL — AUG 2025',
    name: 'SavoirExpert',
    title: 'Software Development Intern',
    description:
      'Developed a document-readiness tracking platform, bringing statuses, pending work, and staff follow-up into one place.',
    label: 'INDUSTRY',
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
    <section id="about" className="about-section section-container">
      <Reveal>
        <div className="section-label">
          <span>03 / THE HUMAN IN THE LOOP</span>
          <span>SEFROU, MOROCCO ↗</span>
        </div>
        <div className="about-layout">
          <div className="about-type">
            <span className="eyebrow">HI, I’M SAAD.</span>
            <h2>
              Not done
              <br />
              <em>learning.</em>
              <br />
              Not even
              <br />
              close<span>.</span>
            </h2>
            <div className="identity-coordinates">
              <span>34° N / 04° W</span>
              <strong>
                SEFROU →<br />
                WHAT’S NEXT
              </strong>
              <small>MOROCCAN ROOTS. CURIOUS MIND.</small>
            </div>
            <div className="about-stamp">
              <span>
                CURIOUS
                <br />
                BY DEFAULT
              </span>
              <span>✳</span>
            </div>
          </div>
          <div className="about-story">
            <p className="about-lead">
              I like the moment when
              <br />
              “what if?” becomes
              <br />
              “it works.”
            </p>
            <p>
              I’m a final-year engineering student at ENSAH, studying Digital Transformation and
              Artificial Intelligence. I’m drawn to the space between a real problem and something
              people can actually use.
            </p>
            <p>
              That’s taken me from recognizing Moroccan Darija to building learning platforms,
              connecting job data, and experimenting with cloud-connected devices. Different
              challenges. The same urge to figure things out.
            </p>
            <div className="about-facts">
              <div>
                <span>NEXT CHAPTER</span>
                <strong>A PFE engineering internship</strong>
              </div>
              <div>
                <span>LET’S TALK IN</span>
                <strong>Arabic · English C1 · French B2</strong>
              </div>
            </div>
            <a className="text-link" href="#contact">
              Have something in mind? <ArrowUpRight size={18} />
            </a>
          </div>
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
              <p className="journey-description">{step.description}</p>
              <span className="journey-badge">{step.label}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
