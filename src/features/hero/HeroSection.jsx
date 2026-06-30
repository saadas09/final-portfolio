import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import TextReveal from "../../components/TextReveal";
import AnimatedCounter from "../../components/AnimatedCounter";
import { cinematicEase, staggerContainer, staggerItem } from "../../utils/motion";
import HeroHighlights from "./components/HeroHighlights";
import resumeUrl from "../../../cv_de_saad (1).pdf";

const stats = [
  { value: "8", suffix: "+", label: "Projects" },
  { value: "10", suffix: "+", label: "Technologies" },
  { value: "3", suffix: "+", label: "Years Coding" },
];

const focusTags = [
  "Digital Transformation",
  "Applied AI",
  "ENSA Al Hoceima",
  "Data Science",
  "Full-Stack",
];

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-64px)] items-center py-20">
      <div className="section-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Left column */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.8, ease: cinematicEase }}
        >
          {/* Badge with pulse */}
          <motion.div variants={staggerItem} className="relative inline-block">
            <Badge className="relative inline-flex items-center">
              <motion.span
                className="inline-block h-2 w-2 rounded-full bg-emerald-400 mr-2"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Available for Opportunities</span>
            </Badge>
          </motion.div>

          {/* Name with character-by-character reveal */}
          <motion.div variants={staggerItem} className="mt-6">
            <TextReveal
              text="Saad Abs"
              className="font-display text-5xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-7xl lg:text-8xl"
            />
          </motion.div>

          {/* Animated role text */}
          <motion.div
            variants={staggerItem}
            className="mt-3"
          >
            <motion.p
              className="bg-gradient-to-r from-[var(--accent)] via-cyan-300 to-blue-400 bg-clip-text text-lg font-medium text-transparent md:text-xl"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Digital Transformation & AI Engineer
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]"
          >
            Engineering student blending <span className="text-[var(--text)] font-medium">data science</span>,{" "}
            <span className="text-[var(--text)] font-medium">AI</span>, and{" "}
            <span className="text-[var(--text)] font-medium">digital transformation</span>{" "}
            to build systems that make complex decisions feel simple.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={staggerItem} className="mt-8 flex gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-[var(--text)]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1.5} />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-4">
            <Button as="a" href="#projects">View Projects</Button>
            <Button as="a" href="#contact" variant="secondary">Get in Touch</Button>
            <Button as="a" href={resumeUrl} target="_blank" rel="noreferrer" variant="ghost" download>
              Download CV
            </Button>
          </motion.div>

          {/* Focus tags */}
          <motion.div variants={staggerItem} className="mt-6 flex flex-wrap gap-2">
            {focusTags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.08,
                  duration: 0.4,
                  ease: cinematicEase,
                }}
                whileHover={{ scale: 1.05, borderColor: "rgba(141,213,230,0.5)" }}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateY: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: cinematicEase }}
          className="perspective-1000"
        >
          <div className="glass group relative overflow-hidden rounded-3xl p-7">
            {/* Animated glow orbs */}
            <motion.div
              className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[rgba(141,213,230,0.2)] blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-[rgba(243,210,160,0.18)] blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Shimmer line on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(141,213,230,0.06) 45%, rgba(141,213,230,0.12) 50%, rgba(141,213,230,0.06) 55%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Current Focus
              </p>
              <h3 className="font-display text-2xl font-semibold text-[var(--text)]">
                Human-centered AI Transformation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                I combine strategy, data, and product thinking to build systems that make complex decisions feel simple.
              </p>
            </div>

            <HeroHighlights />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.span
          className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]"
        >
          Scroll
        </motion.span>
        <motion.div
          className="h-8 w-[1px] bg-gradient-to-b from-[var(--accent)] to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
