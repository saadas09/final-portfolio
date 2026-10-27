export default function Reveal({ children, className = '', delay: _delay, ...props }) {
  return (
    <div {...props} className={className} data-reveal>
      {children}
    </div>
  );
}
