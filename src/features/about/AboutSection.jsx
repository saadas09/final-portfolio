import { motion } from "framer-motion";
import SectionWrapper from "../../components/ui/SectionWrapper";
import Button from "../../components/ui/Button";
import { techStack, personal } from "../../data/portfolioData";
import TechStackGrid from "./components/TechStackGrid";
import resumeUrl from "../../../cv_de_saad (1).pdf";
import { useState } from "react";
import { Eye, Download, ExternalLink } from "lucide-react";

const infoCards = [
  { label: "Engineering Student", detail: "ENSA Al Hoceima • 2022-2027" },
  { label: "Location", detail: "Sefrou, Morocco" },
  { label: "Focus", detail: "Digital Transformation & AI" },
  { label: "Goal", detail: "Innovation-driven environments" },
];

export default function AboutSection() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <SectionWrapper
        id="about"
        eyebrow="About"
        title="Engineering with clarity and impact"
        subtitle="Practical AI and digital transformation — strategy, data, and design converging into products that feel simple and useful."
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main about card */}
          <div className="glass rounded-3xl p-6 md:p-8">
            <p className="text-[15px] leading-7 text-[var(--muted)]">
              Digital Transformation and AI Engineering student with a solid background in{" "}
              <span className="text-[var(--text)] font-medium">data science</span>,{" "}
              <span className="text-[var(--text)] font-medium">automation</span>, and{" "}
              <span className="text-[var(--text)] font-medium">emerging technologies</span>.
              I focus on building AI-based solutions and optimizing business processes through applied digital transformation.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button as="button" onClick={() => setShowResume(true)} variant="primary">
                <Eye className="h-4 w-4" />
                View Resume
              </Button>
              <Button as="a" href={resumeUrl} target="_blank" rel="noreferrer" variant="secondary" download>
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button as="a" href={personal.github} target="_blank" rel="noreferrer" variant="ghost">
                <ExternalLink className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>

          {/* Info mini-cards grid */}
          <div className="grid grid-cols-2 gap-3">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, borderColor: "rgba(141,213,230,0.3)" }}
                className="glass flex flex-col items-start rounded-2xl p-4 transition-all duration-300"
              >
                {/* emoji removed intentionally to keep UI clean */}
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {card.label}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{card.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 glass rounded-3xl p-6"
        >
          <h3 className="font-display text-xl font-semibold text-[var(--text)] mb-2">Tech I Work With</h3>
          <TechStackGrid techStack={techStack} />
        </motion.div>
      </SectionWrapper>

      {/* Resume modal */}
      {showResume && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setShowResume(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white"
          >
            <button
              onClick={() => setShowResume(false)}
              className="absolute right-4 top-4 z-50 inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-200 transition"
              aria-label="Close resume preview"
            >
              Close
            </button>
            <iframe src={resumeUrl} className="h-full w-full" title="Resume preview" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
