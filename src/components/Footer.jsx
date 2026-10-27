import { ArrowUp } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="site-footer section-container">
      <a href="#hero" className="footer-logo" aria-label="Saad Abs, back to top">
        s✳a
      </a>
      <span>
        ENGINEERED WITH CURIOSITY.
        <br />
        ALWAYS A WORK IN PROGRESS.
      </span>
      <div>
        <span>© {new Date().getFullYear()} SAAD ABS</span>
        <a href="#hero" aria-label="Back to top">
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
}
