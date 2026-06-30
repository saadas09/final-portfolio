import { motion } from "framer-motion";
import { Cpu, Workflow, BarChart3 } from "lucide-react";

const points = [
  { icon: Workflow, text: "Process mapping & service optimization" },
  { icon: Cpu, text: "AI prototypes for decision support" },
  { icon: BarChart3, text: "Data-driven products with clear UX" },
];

export default function HeroHighlights() {
  return (
    <div className="relative z-10 mt-8 space-y-3 text-sm text-[var(--text)]">
      {points.map((point, index) => {
        const Icon = point.icon;
        return (
          <motion.div
            key={point.text}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{
              x: 6,
              borderColor: "rgba(141,213,230,0.4)",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-all duration-300"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10">
              <Icon className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <span>{point.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
