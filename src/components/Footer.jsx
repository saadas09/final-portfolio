import { ArrowUp } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="site-footer section-container">
      <a href="#hero" className="wordmark" aria-label="Saad Abs, back to top">
        saad abs<span className="brand-dot">✳</span>
      </a>
      <span>Made with intention. Always evolving.</span>
      <div>
        <span>© {new Date().getFullYear()} Saad Abs</span>
        <a href="#hero" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
