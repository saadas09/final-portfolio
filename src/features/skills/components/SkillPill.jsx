import { memo } from "react";

/**
 * Matches the TechStackGrid card style from the About section:
 * rounded-2xl, vertical layout (icon on top, name below),
 * same border / bg / hover treatment.
 */
function SkillPill({ skill }) {
  const Icon = skill.icon;

  return (
    <div className="skill-pill interactive group/pill flex shrink-0 flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.08] hover:border-[rgba(141,213,230,0.5)] hover:bg-white/[0.06] hover:shadow-[0_8px_24px_-8px_rgba(141,213,230,0.2)] md:px-6 md:py-5">
      <Icon className="mb-2 text-2xl text-[var(--muted)] transition-colors duration-300 group-hover/pill:text-[var(--accent)] md:text-3xl" />
      <span className="whitespace-nowrap text-[11px] font-medium text-[var(--muted)] transition-colors duration-300 group-hover/pill:text-[var(--text)] md:text-xs">
        {skill.name}
      </span>
    </div>
  );
}

export default memo(SkillPill);
