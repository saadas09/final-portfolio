import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Card from "../../../components/ui/Card";
import { cinematicEase } from "../../../utils/motion";
import { useCardTilt } from "../../../hooks/useCardTilt";

export default function ProjectCard({ project, index }) {
  const tilt = useCardTilt({ max: 5 });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: cinematicEase, delay: index * 0.08 }}
      style={tilt.style}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <Card className="group overflow-hidden" interactive>
        {/* Image with parallax zoom */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f18] via-[#0b0f18]/40 to-transparent" />

          {/* Category badge */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + 0.2 }}
            className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-md"
          >
            {project.category}
          </motion.span>

          {/* Hover overlay with links */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-[var(--text)] leading-snug">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--muted)] line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack icons */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((Icon, iconIndex) => (
              <motion.span
                key={iconIndex}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[var(--muted)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <Icon className="text-base" />
              </motion.span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
