import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { cinematicEase } from "../../utils/motion";

export default function SectionWrapper({ id, eyebrow, title, subtitle, children }) {
  const scrollAnimation = useScrollAnimation({
    transition: { duration: 0.74, ease: cinematicEase },
    viewport: { amount: 0.2 },
  });

  return (
    <section id={id} className="py-20 md:py-28">
      <div className="section-container">
        <motion.div {...scrollAnimation} className="mb-12">
          {/* Eyebrow with decorative line */}
          <div className="mb-3 flex items-center gap-3">
            <motion.div
              className="h-px w-8 bg-gradient-to-r from-[var(--accent)] to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{eyebrow}</p>
          </div>

          <h2 className="font-display text-3xl font-semibold md:text-5xl">{title}</h2>

          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
