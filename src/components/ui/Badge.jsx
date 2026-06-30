import { motion } from "framer-motion";

export default function Badge({ className = "", children }) {
  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--text)] backdrop-blur-sm ${className}`}
      whileHover={{ scale: 1.03, borderColor: "rgba(141,213,230,0.3)" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
}
