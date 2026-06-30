import { motion } from "framer-motion";
import { cinematicEase } from "../utils/motion";

export default function TextReveal({ text, className = "", as: Component = "h1" }) {
  const words = text.split(" ");

  return (
    <Component className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block overflow-hidden">
            <span className="inline-flex">
              {word.split("").map((char, ci) => (
                <motion.span
                  key={`${wi}-${ci}`}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0, rotateX: -80 }}
                  whileInView={{ y: "0%", opacity: 1, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    delay: wi * 0.1 + ci * 0.03,
                    duration: 0.5,
                    ease: cinematicEase,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wi < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </span>
    </Component>
  );
}
