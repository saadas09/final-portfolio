import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const enter = () => setHidden(false);
    const leave = () => setHidden(true);

    const handleHover = () => {
      const interactiveElements = document.querySelectorAll(".interactive, a, button, [role='button'], input, textarea, select");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    // Re-observe interactive elements periodically
    handleHover();
    const observer = new MutationObserver(handleHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-white/30"
          animate={{
            width: hovering ? 48 : 20,
            height: hovering ? 48 : 20,
            opacity: hidden ? 0 : 1,
            backgroundColor: hovering
              ? "rgba(141, 213, 230, 0.08)"
              : "rgba(255, 255, 255, 0.06)",
            borderColor: hovering
              ? "rgba(141, 213, 230, 0.5)"
              : "rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
          animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
