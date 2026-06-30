import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import CustomCursor from "../components/CustomCursor";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useScrollProgress } from "../hooks/useScrollProgress";

export default function MainLayout({ children }) {
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <AnimatedBackground />
      <CustomCursor />
      <ScrollToTop />

      {/* Scroll progress bar */}
      <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--accent)] via-cyan-400 to-blue-400"
          animate={{ width: `${scrollProgress}%` }}
          transition={{ ease: "easeOut", duration: 0.15 }}
        />
      </div>

      <Navbar />

      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
