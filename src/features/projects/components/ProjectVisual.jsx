import {
  ArrowUpRight,
  BookOpen,
  Check,
  Cpu,
  Database,
  FileText,
  Layers3,
  Lightbulb,
  Search,
  Sparkles,
  Workflow,
} from 'lucide-react';

export default function ProjectVisual({ kind }) {
  return (
    <div className={`project-illustration illustration-${kind}`} aria-hidden="true">
      {kind === 'matching' && (
        <div className="match-composition">
          <div className="match-heading">
            Find your <span>next chapter.</span>
            <ArrowUpRight size={28} />
          </div>
          <div className="match-search">
            <Search size={15} />
            <span>Your skills. New possibilities.</span>
            <span className="mini-enter">↗</span>
          </div>
          <div className="match-flow">
            <span>YOUR PROFILE</span>
            <i />
            <Sparkles size={20} />
            <i />
            <span>YOUR NEXT ROLE</span>
          </div>
          <div className="match-pills">
            <span>Python</span>
            <span>Data engineering</span>
            <span>Machine learning</span>
          </div>
          <div className="floating-note">
            <span className="mini-dot" /> Skills, connected.
          </div>
        </div>
      )}
      {kind === 'learning' && (
        <div className="learning-composition">
          <div className="learning-heading">
            <span className="learning-logo">
              <Layers3 size={19} /> modis<span>learn</span>
            </span>
            <span>LEARNING, REIMAGINED</span>
          </div>
          <div className="learning-main">
            <div>
              <span className="mini-eyebrow">YOUR NEXT CHAPTER</span>
              <h4>
                Room to grow.
                <br />
                Skills to go further.
              </h4>
              <span className="mini-action">
                Explore learning <ArrowUpRight size={13} />
              </span>
            </div>
            <div className="learning-orbit">
              <BookOpen size={31} strokeWidth={1.3} />
              <i />
              <i />
            </div>
          </div>
          <div className="learning-steps">
            <span>
              <Check size={12} /> Learn
            </span>
            <i />
            <span>
              <Check size={12} /> Practice
            </span>
            <i />
            <span>
              <Check size={12} /> Achieve
            </span>
          </div>
        </div>
      )}
      {kind === 'ocr' && (
        <div className="ocr-composition">
          <span className="mini-eyebrow">FROM IMAGE TO UNDERSTANDING</span>
          <div className="scan-frame">
            <span lang="ar" dir="rtl">
              مرحبا بالعالم
            </span>
            <i className="scan-line" />
            <b className="scan-corner corner-one" />
            <b className="scan-corner corner-two" />
          </div>
          <div className="ocr-result">
            <span className="mini-dot" />
            <span>Arabic & Moroccan Darija</span>
            <span className="ocr-cursor">|</span>
          </div>
          <div className="visual-footnote">PREPROCESS → RECOGNIZE → EVALUATE</div>
        </div>
      )}
      {kind === 'rag' && (
        <div className="rag-composition">
          <div className="document-stack">
            <div />
            <div />
            <div>
              <FileText size={26} strokeWidth={1.3} />
              <i />
              <i />
              <i />
              <span>YOUR KNOWLEDGE</span>
            </div>
          </div>
          <div className="rag-connector">
            <i />
            <Sparkles size={20} />
            <i />
          </div>
          <div className="answer-card">
            <span className="mini-eyebrow">CONTEXT COMES FIRST</span>
            <h4>
              Ask better.
              <br />
              Find meaning.
            </h4>
            <div className="answer-line" />
            <div className="answer-line short" />
            <span>
              <Check size={12} /> Grounded in your documents
            </span>
          </div>
        </div>
      )}
      {kind === 'hotel' && (
        <div className="hotel-composition">
          <span className="mini-eyebrow">EVERY DETAIL, CONNECTED</span>
          <h4>
            Less friction.
            <br />
            <span>More flow.</span>
          </h4>
          <div className="workflow-nodes">
            <span>
              <Layers3 size={22} />
              <small>Organize</small>
            </span>
            <i />
            <span>
              <Workflow size={22} />
              <small>Connect</small>
            </span>
            <i />
            <span>
              <Check size={22} />
              <small>Simplify</small>
            </span>
          </div>
        </div>
      )}
      {kind === 'iot' && (
        <div className="iot-composition">
          <div className="iot-orbit">
            <i />
            <i />
            <i />
            <Lightbulb size={47} strokeWidth={1.1} />
          </div>
          <div className="iot-chip chip-one">
            <Cpu size={15} /> DEVICE
          </div>
          <div className="iot-chip chip-two">
            <Database size={15} /> CLOUD
          </div>
          <div className="iot-caption">
            <span className="mini-dot" /> A small signal. A smarter system.
          </div>
        </div>
      )}
      {kind === 'gan' && (
        <div className="gan-composition">
          <span className="mini-eyebrow">THE ART OF LEARNING TO GENERATE</span>
          <div className="digit-grid">
            {'307215984'.split('').map((digit, index) => (
              <span key={index} style={{ transform: `rotate(${index % 2 ? -8 : 6}deg)` }}>
                {digit}
              </span>
            ))}
          </div>
          <div className="visual-footnote">GENERATOR ↔ DISCRIMINATOR</div>
        </div>
      )}
    </div>
  );
}
