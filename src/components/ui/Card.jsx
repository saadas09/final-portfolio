import { motion } from "framer-motion";

export default function Card({ className = "", children, interactive = false }) {
  if (!interactive) {
    return (
      <article className={`glass rounded-3xl transition-all duration-300 ${className}`}>
        {children}
      </article>
    );
  }

  return (
    <motion.article
      className={`glass rounded-3xl transition-all duration-300 ${className}`}
      whileHover={{
        y: -6,
        boxShadow: "0 30px 50px -15px rgba(10, 20, 38, 0.4), 0 0 0 1px rgba(141,213,230,0.08)",
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.article>
  );
}
