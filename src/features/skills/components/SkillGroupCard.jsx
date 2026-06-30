import { motion, useInView } from "framer-motion";
import Card from "../../../components/ui/Card";
import { cinematicEase } from "../../../utils/motion";
import { useRef } from "react";

const groupIcons = {
  Frontend: "FE",
  Backend: "BE",
  AI: "AI",
  Tools: "TL",
};

export default function SkillGroupCard({ group, groupIndex }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: cinematicEase, delay: groupIndex * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card interactive className="p-6 group h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{groupIcons[group.name] || ""}</span>
          <h3 className="font-display text-xl font-semibold text-[var(--text)]">
            {group.name}
          </h3>
        </div>

        {/* Skills with animated bars */}
        <div className="space-y-5">
          {group.skills.map((skill, skillIndex) => (
            <div key={skill.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-[var(--text)]">{skill.label}</span>
                <motion.span
                  className="text-xs font-medium text-[var(--accent)]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: groupIndex * 0.1 + skillIndex * 0.1 + 0.5 }}
                >
                  {skill.value}%
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--accent), #38bdf8, #22d3ee)",
                  }}
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: `${skill.value}%` } : { width: "0%" }}
                  transition={{
                    delay: groupIndex * 0.1 + skillIndex * 0.08 + 0.3,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full opacity-50"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={isInView ? { backgroundPosition: ["-100% 0", "200% 0"] } : {}}
                  transition={{
                    delay: groupIndex * 0.1 + skillIndex * 0.08 + 1.3,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "linear",
                  }}
                  initial={{ width: `${skill.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
