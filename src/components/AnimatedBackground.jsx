import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Canvas particle system ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = Math.min(80, Math.floor(window.innerWidth / 18));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", handleMouseMove);

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(141, 213, 230, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(141, 213, 230, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1]"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ── Floating orbs ── */
const orbs = [
  { id: 1, className: "left-[6%] top-[10%] h-64 w-64", color: "rgba(141, 213, 230, 0.22)", delay: 0 },
  { id: 2, className: "right-[8%] top-[18%] h-72 w-72", color: "rgba(110, 158, 255, 0.18)", delay: 1.2 },
  { id: 3, className: "left-[20%] bottom-[12%] h-56 w-56", color: "rgba(243, 210, 160, 0.16)", delay: 0.6 },
  { id: 4, className: "right-[25%] bottom-[20%] h-48 w-48", color: "rgba(168, 130, 255, 0.12)", delay: 1.8 },
];

export default function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    let raf = null;
    const handleMove = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 glass-grid" />
      <div className="noise-overlay absolute inset-0" />

      {/* Aurora bands */}
      <div className="absolute -top-40 left-[-10%] h-72 w-[120%] aurora-band" />
      <div className="absolute -bottom-44 left-[-10%] h-72 w-[120%] aurora-band aurora-slow" />

      {/* Ribbons */}
      <div className="absolute -left-44 top-[16%] h-36 w-[520px] ribbon" />
      <div className="absolute -right-44 top-[48%] h-40 w-[560px] ribbon ribbon-alt" />

      {/* Canvas particles */}
      <ParticleCanvas />

      {/* Floating orbs with mouse parallax */}
      {orbs.map((orb, index) => {
        const factor = 18 + index * 6;
        const tx = mouse.x * factor * (index % 2 === 0 ? 1 : -1);
        const ty = mouse.y * factor * 0.6;

        return (
          <div
            key={orb.id}
            className={`absolute ${orb.className}`}
            style={{
              transform: `translate3d(${tx}px, ${ty}px, 0)`,
              transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <motion.div
              className="h-full w-full rounded-full blur-3xl"
              style={{ background: orb.color }}
              animate={{
                y: [0, -24, 0],
                x: [0, index % 2 === 0 ? 18 : -14, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 12 + index * 2,
                delay: orb.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
