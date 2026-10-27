import { ArrowUpRight, Download, FileText } from 'lucide-react';
import { resumes } from '../../data/portfolioData';
import Reveal from '../../components/Reveal';
export default function ResumeSection() {
  return (
    <section id="resumes" className="resume-section section-container section-space">
      <Reveal>
        <div className="section-label">
          <span>04 / THE CV LIBRARY</span>
          <span>FOUR WAYS TO GET TO KNOW MY WORK</span>
        </div>
        <div className="section-heading">
          <h2>
            Same curiosity.
            <br />
            <span className="serif">The right perspective.</span>
          </h2>
          <p>
            Looking for a particular skill set? Choose the CV that fits your team, or take the full
            picture.
          </p>
        </div>
      </Reveal>
      <div className="resume-grid">
        {resumes.map((resume, index) => (
          <Reveal key={resume.id} delay={index * 0.05}>
            <article className={`resume-card resume-${resume.color}`}>
              <div className="resume-card-top">
                <span>
                  {resume.number} / {resume.label}
                </span>
                <FileText size={22} strokeWidth={1.3} />
              </div>
              <h3>{resume.name}</h3>
              <p>{resume.description}</p>
              <div className="resume-meta">
                PDF <span>·</span> {resume.pages} <span>·</span> English
              </div>
              <div className="resume-actions">
                <a
                  href={resume.url}
                  download={resume.filename}
                  className="resume-download"
                  aria-label={`Download ${resume.name} CV`}
                >
                  Download CV <Download size={16} />
                </a>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Preview ${resume.name} CV`}
                  className="resume-preview"
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
