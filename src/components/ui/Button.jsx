import { motion } from "framer-motion";

export default function Button({
  as: Component = "button",
  className = "",
  variant = "primary",
  children,
  ...props
}) {
  const MotionComponent = motion.create(Component);

  const variants = {
    primary:
      "bg-[var(--accent)] text-[#0b1220] shadow-[0_10px_30px_-14px_rgba(141,213,230,0.7)] hover:bg-[var(--accent-strong)] hover:shadow-[0_14px_36px_-12px_rgba(141,213,230,0.5)]",
    secondary:
      "border border-white/20 bg-white/5 text-[var(--text)] hover:bg-white/10 hover:border-white/30",
    ghost:
      "border border-white/10 bg-transparent text-[var(--muted)] hover:text-[var(--text)] hover:border-white/25 hover:bg-white/5",
  };

  return (
    <MotionComponent
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`interactive group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Shimmer on hover */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </MotionComponent>
  );
}
