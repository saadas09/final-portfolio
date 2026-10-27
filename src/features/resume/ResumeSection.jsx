import { ArrowUpRight, Download } from 'lucide-react';
import { resumes } from '../../data/portfolioData';
import Reveal from '../../components/Reveal';
export default function ResumeSection() {
  return (
    <section id="resumes" className="resume-section">
      <div className="section-container">
        <Reveal>
          <div className="section-label">
            <span>04 / TAKE A CLOSER LOOK</span>
            <span>FOUR PERSPECTIVES. SAME SAAD.</span>
          </div>
          <div className="resume-heading">
            <h2>
              A little more
              <br />
              <em>on paper.</em>
            </h2>
            <p>
              Pick the perspective that fits your team.
              <br />
              Or get the full picture.
              <br />
              <span>FOUR CVS. ZERO GUESSWORK.</span>
            </p>
          </div>
        </Reveal>
        <div className="resume-grid">
          {resumes.map((resume, i) => (
            <article
              key={resume.id}
              className={`resume-card resume-${resume.color}`}
              style={{ '--rotation': `${[-3, 2, -2, 3][i]}deg` }}
            >
              <div className="resume-card-top">
                <span>SA / {resume.number}</span>
                <ArrowUpRight size={24} />
              </div>
              <div className="resume-paper-lines" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="resume-label">{resume.label}</span>
              <h3>{resume.name}</h3>
              <p>{resume.description}</p>
              <div className="resume-meta">PDF / {resume.pages} / ENGLISH</div>
              <div className="resume-actions">
                <a
                  href={resume.url}
                  download={resume.filename}
                  className="resume-download"
                  aria-label={`Download ${resume.name} CV`}
                >
                  Download <Download size={17} />
                </a>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-preview"
                  aria-label={`Preview ${resume.name} CV`}
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
