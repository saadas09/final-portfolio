import { useState } from 'react';
import { caseStudies } from '../../../data/caseStudies';
export default function CaseStudyDetails({ project }) {
  const study = caseStudies[project.id];
  const [copied, setCopied] = useState(false);
  if (!study) return null;
  return (
    <div className="deep-case">
      <div className="case-heading">
        <span className="eyebrow">BEHIND THE BUILD</span>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
      </div>
      <div className="architecture">
        <span className="eyebrow">SYSTEM WALKTHROUGH</span>
        <ol>
          {study.flow.map((step, i) => (
            <li key={step}>
              <small>0{i + 1}</small>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
      {study.images && (
        <div className="case-gallery">
          {study.images.map((image) => (
            <figure key={image.src}>
              <a
                href={image.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full size: ${image.label}`}
              >
                <img src={image.src} alt={image.label} loading="lazy" />
              </a>
              <figcaption>{image.label} ↗</figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="decision-grid">
        {study.decisions.map(([title, text], i) => (
          <article key={title}>
            <span>DECISION / 0{i + 1}</span>
            <h4>{title}</h4>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="case-evidence">
        <span className="eyebrow">WHAT THE IMPLEMENTATION SHOWS</span>
        <p>{study.evidence}</p>
        <span className="eyebrow">WHAT TO VALIDATE NEXT</span>
        <p>{study.next}</p>
      </div>
      <blockquote>{study.takeaway}</blockquote>
      <button
        className="text-link"
        onClick={async () => {
          try {
            const url = new URL(window.location.href);
            url.hash = '';
            url.searchParams.set('project', project.id);
            await navigator.clipboard.writeText(url.href);
            setCopied(true);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? 'Case-study link copied' : 'Copy a link to this case study'} ↗
      </button>
      <span className="sr-only" role="status">
        {copied ? 'Case-study link copied' : ''}
      </span>
    </div>
  );
}
