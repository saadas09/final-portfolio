import {
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  Layers3,
  Search,
  Sparkles,
  Workflow,
  Cpu,
} from 'lucide-react';
export default function ProjectVisual({ kind }) {
  return (
    <div className={`project-illustration illustration-${kind}`} aria-hidden="true">
      {kind === 'matching' ? (
        <div className="matching-art">
          <div className="match-orbit orbit-a" />
          <div className="match-orbit orbit-b" />
          <div className="mini-window profile-window">
            <div className="mini-window-bar">
              <i />
              <i />
              <i />
              <span>YOUR POTENTIAL</span>
            </div>
            <div className="profile-avatar">
              S<span>✳</span>
            </div>
            <strong>
              A skill set.
              <br />A new direction.
            </strong>
            <div className="mini-tags">
              <span>Python</span>
              <span>React</span>
              <span>AI</span>
            </div>
          </div>
          <div className="match-bridge">
            <Sparkles size={25} />
          </div>
          <div className="mini-window opportunity-window">
            <div className="opportunity-heading">
              <span className="opportunity-symbol">
                <ArrowUpRight />
              </span>
              <span>
                FINDURWAY
                <br />
                <small>FIND YOUR NEXT CHAPTER</small>
              </span>
            </div>
            <div className="mock-search">
              <Search size={14} /> A world of possibilities.
            </div>
            {['AI engineering', 'Data & cloud', 'Software development'].map((t, i) => (
              <div className="opportunity-row" key={t}>
                <span>0{i + 1}</span>
                {t}
                <ArrowUpRight size={14} />
              </div>
            ))}
          </div>
          <div className="floating-chip">
            <span className="status-dot" /> CONNECTED BY MEANING
          </div>
        </div>
      ) : kind === 'learning' ? (
        <div className="learning-art">
          <div className="learn-label">
            <Layers3 size={23} /> modis<span>learn</span>
          </div>
          <div className="learning-platform">
            <div className="platform-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="platform-content">
              <span className="mini-eyebrow">MAKE ROOM FOR GROWTH</span>
              <h4>
                What will you
                <br />
                learn next?
              </h4>
              <div className="course-tiles">
                <div>
                  <BookOpen />
                  <span>Discover</span>
                </div>
                <div>
                  <Workflow />
                  <span>Practice</span>
                </div>
                <div>
                  <Check />
                  <span>Achieve</span>
                </div>
              </div>
              <div className="lesson-lines">
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="certificate">
            <span>✳</span>
            <div>
              ONE STEP FURTHER.<small>LEARNING THAT GOES SOMEWHERE.</small>
            </div>
            <Check size={20} />
          </div>
        </div>
      ) : kind === 'ocr' ? (
        <div className="ocr-art">
          <div className="scan-coordinate">
            INPUT_01.JPG <span>AR / MA</span>
          </div>
          <div className="scan-frame">
            <span lang="ar" dir="rtl">
              مرحبا بالعالم
            </span>
            <i className="scan-line" />
            <b className="corner tl" />
            <b className="corner tr" />
            <b className="corner bl" />
            <b className="corner br" />
          </div>
          <div className="ocr-path">
            <span>IMAGE</span>
            <i />
            <Cpu size={25} />
            <i />
            <span>TEXT</span>
          </div>
          <div className="recognized-text">
            <span className="status-dot" />
            <div>
              Different script.
              <br />
              <strong>Same possibility.</strong>
            </div>
            <span className="text-cursor">▏</span>
          </div>
          <div className="ocr-metadata">
            CRNN + BiLSTM + CTC <span>BUILT FOR DARIJA.</span>
          </div>
        </div>
      ) : kind === 'rag' ? (
        <div className="rag-art">
          <div className="rag-documents">
            <div />
            <div />
            <div>
              <FileText size={38} />
              <i />
              <i />
              <i />
              <span>YOUR KNOWLEDGE</span>
            </div>
          </div>
          <div className="rag-connector">
            <i />
            <Sparkles size={24} />
            <i />
          </div>
          <div className="answer-window">
            <span className="mini-eyebrow">A LITTLE CONTEXT CHANGES EVERYTHING</span>
            <h4>
              Good questions.
              <br />
              Grounded answers.
            </h4>
            <div className="answer-lines">
              <i />
              <i />
              <i />
            </div>
            <div className="source-pill">
              <FileText size={12} /> Connected to your documents
            </div>
          </div>
        </div>
      ) : (
        <div className="system-art">
          <span className="system-orbit" />
          <Workflow size={70} strokeWidth={1} />
          <h4>
            {kind === 'iot'
              ? 'Small signal. Big connection.'
              : kind === 'gan'
                ? 'Learning to imagine.'
                : 'Every detail, connected.'}
          </h4>
          <div className="system-nodes">
            <span>INPUT</span>
            <i />
            <span>PROCESS</span>
            <i />
            <span>IMPACT</span>
          </div>
        </div>
      )}
    </div>
  );
}
