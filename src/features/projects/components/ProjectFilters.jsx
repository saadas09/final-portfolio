import { motion } from "framer-motion";

const filters = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "ai", label: "AI / ML" },
  { id: "web", label: "Web" },
  { id: "iot", label: "IoT" },
  { id: "desktop", label: "Desktop" },
  { id: "systems", label: "Systems" },
];

export default function ProjectFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`interactive relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "text-[#0b1220]"
                : "border border-white/15 bg-white/5 text-[var(--muted)] hover:border-white/30 hover:text-[var(--text)]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-[var(--accent)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
