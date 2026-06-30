import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../../components/ui/SectionWrapper";
import { timeline } from "../../data/portfolioData";
import TimelineItem from "./components/TimelineItem";

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  // Animate the timeline line height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper
      id="timeline"
      eyebrow="Experience"
      title="Journey"
      subtitle="Academic milestones and project highlights along the way."
    >
      <div ref={containerRef} className="relative pl-8 md:pl-10">
        {/* Static background line */}
        <div className="absolute left-3 top-0 h-full w-[2px] bg-white/10 md:left-4" />

        {/* Animated progress line */}
        <motion.div
          className="absolute left-3 top-0 w-[2px] bg-gradient-to-b from-[var(--accent)] via-cyan-400 to-blue-500 md:left-4"
          style={{ height: lineHeight }}
        />

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <TimelineItem key={item.year + item.role} item={item} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
