import { motion } from "framer-motion";

const text = "Saad Abs";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glowing orb */}
      <motion.div
        className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(141,213,230,0.25),transparent_70%)] blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Name reveal */}
      <div className="relative flex overflow-hidden">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="font-display text-4xl font-bold text-white md:text-6xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3 + i * 0.06,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Loading bar */}
      <motion.div
        className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--accent)] to-cyan-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-xs uppercase tracking-[0.4em] text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Portfolio
      </motion.p>
    </motion.div>
  );
}
