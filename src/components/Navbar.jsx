import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#timeline", id: "timeline" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const activeSection = useActiveSection();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <motion.nav
        className={`section-container mt-4 flex h-14 items-center gap-6 rounded-full border px-5 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-white/15 bg-white/8 shadow-lg shadow-black/10"
            : "border-white/10 bg-white/5"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          className="interactive relative font-display text-lg font-semibold text-[var(--text)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">SA</span>
          <motion.span
            className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-[var(--accent)] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </motion.a>

        {/* Desktop links */}
        <ul className="ml-auto hidden items-center gap-1 text-sm text-[var(--muted)] md:flex">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`interactive relative rounded-full px-3 py-1.5 transition-all duration-300 ${
                    isActive
                      ? "text-[var(--text)]"
                      : "hover:text-[var(--text)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="interactive ml-auto rounded-full border border-white/20 bg-white/10 p-2 text-[var(--text)] md:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="section-container mt-2 overflow-hidden rounded-2xl border border-white/15 bg-[#0b0f18]/95 p-4 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    activeSection === link.id
                      ? "bg-white/10 text-[var(--text)]"
                      : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow line */}
      <motion.div
        className="mx-auto mt-3 h-px w-[92vw] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ opacity: scrolled ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />
    </header>
  );
}
