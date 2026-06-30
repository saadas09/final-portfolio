import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Download } from "lucide-react";
import resumeUrl from "../../../../cv_de_saad (1).pdf";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/saad-abs-b56221338" },
  { icon: Mail, label: "Email", href: "mailto:hmssaad156@gmail.com" },
  { icon: Phone, label: "+212 645 186 011", href: "tel:+212645186011" },
  { icon: MapPin, label: "Sefrou, Morocco", href: "https://www.google.com/maps/search/Sefrou+Morocco" },
  { icon: Download, label: "Download Resume", href: resumeUrl, download: true },
];

export default function ContactLinks() {
  return (
    <div className="mt-6 space-y-2.5">
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            download={link.download || undefined}
            target={link.download ? undefined : "_blank"}
            rel={link.download ? undefined : "noreferrer"}
            className="interactive group/link flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-[var(--text)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-white/[0.06]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 transition-colors group-hover/link:bg-[var(--accent)]/20">
              <Icon className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <span className="text-sm">{link.label}</span>
          </motion.a>
        );
      })}
    </div>
  );
}
