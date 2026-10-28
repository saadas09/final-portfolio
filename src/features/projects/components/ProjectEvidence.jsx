import ProjectVisual from './ProjectVisual';
export default function ProjectEvidence({ project }) {
  if (project.id === 'lms')
    return (
      <div className="product-screen">
        <div className="browser-chrome">
          <i />
          <i />
          <i />
          <span>MAROC MODIS / LEARNING PLATFORM</span>
        </div>
        <img
          src="/projects/lms-welcome.png"
          alt="Actual Maroc Modis learning platform welcome interface"
          loading="lazy"
          width="1440"
          height="950"
        />
        <span className="evidence-badge">ACTUAL APPLICATION</span>
      </div>
    );
  if (project.id === 'darija')
    return (
      <div className="ocr-evidence">
        <span className="eyebrow">FROM THE ORIGINAL REPOSITORY</span>
        <h4>
          A language I know.
          <br />A problem worth solving.
        </h4>
        <div className="real-scan">
          <img
            src="/projects/darija-sample.png"
            alt="Original Arabic text image used as an OCR input sample"
            loading="lazy"
          />
          <i />
        </div>
        <div className="recognition-flow">
          <span>IMAGE</span>
          <b>→</b>
          <span>CRNN + CTC</span>
          <b>→</b>
          <span>TEXT</span>
        </div>
        <p>Original input sample. Recognition quality is evaluated with CER and WER.</p>
      </div>
    );
  return <ProjectVisual kind={project.visual} />;
}
