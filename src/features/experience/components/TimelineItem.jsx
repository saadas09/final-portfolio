import { motion } from "framer-motion";
import Card from "../../../components/ui/Card";
import { cinematicEase } from "../../../utils/motion";

export default function TimelineItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: cinematicEase, delay: index * 0.15 }}
      className="relative"
    >
      {/* Glowing dot */}
      <motion.div
        className="absolute -left-[25px] top-6 md:-left-[30px]"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
      >
        <span className="relative flex h-4 w-4">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-40"
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[#0b0f18]" />
        </span>
      </motion.div>

      <Card interactive className="rounded-2xl p-5 group">
        <motion.p
          className="inline-block rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--accent)]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.1 }}
        >
          {item.year}
        </motion.p>
        <h3 className="mt-3 font-display text-xl font-semibold text-[var(--text)]">{item.role}</h3>
        <p className="mt-1 text-sm font-medium text-[var(--accent)]/70">{item.company}</p>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
      </Card>
    </motion.div>
  );
}
