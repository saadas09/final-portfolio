import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/saadas09", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/saad-abs-b56221338", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hmssaad156@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10">
      {/* Gradient glow at top */}
      <div className="absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="section-container flex flex-col items-center gap-6">
        {/* Social icons */}
        <div className="flex gap-4">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="interactive flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--muted)] transition-all hover:border-white/30 hover:bg-white/10 hover:text-[var(--text)]"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            );
          })}
        </div>

        {/* Copyright */}
        <motion.p
          className="flex items-center gap-1.5 text-xs text-[var(--muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} Saad Abs — Built with
          <Heart className="h-3 w-3 text-red-400" />
        </motion.p>

        <motion.p
          className="text-[10px] uppercase tracking-[0.35em] text-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Digital Transformation & AI Engineering
        </motion.p>
      </div>
    </footer>
  );
}
