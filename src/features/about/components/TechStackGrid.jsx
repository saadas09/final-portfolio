import { motion } from "framer-motion";

export default function TechStackGrid({ techStack }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {techStack.map(({ name, icon: Icon }, index) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04, duration: 0.4, type: "spring", stiffness: 200 }}
          whileHover={{
            y: -6,
            scale: 1.08,
            borderColor: "rgba(141,213,230,0.5)",
            boxShadow: "0 8px 24px -8px rgba(141,213,230,0.2)",
          }}
          className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-all duration-300 cursor-default"
        >
          <Icon className="mb-2 text-2xl text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--accent)]" />
          <p className="text-xs font-medium text-[var(--muted)] transition-colors group-hover:text-[var(--text)]">
            {name}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
