import { motion } from "framer-motion";

export default function ContactField({ label, name, type = "text", value, onChange, error }) {
  return (
    <div className="group relative">
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 pb-3 pt-6 text-[var(--text)] outline-none transition-all duration-300 focus:border-[var(--accent)]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(141,213,230,0.08)]"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-4 top-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)] transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--accent)]"
      >
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
