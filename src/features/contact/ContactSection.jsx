import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../../components/ui/SectionWrapper";
import ContactField from "./components/ContactField";
import ContactLinks from "./components/ContactLinks";
import { Send, CheckCircle } from "lucide-react";

const initialValues = { name: "", email: "", message: "" };

export default function ContactSection() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Your name is required.";
    if (!values.email.trim()) {
      next.email = "Your email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!values.message.trim()) next.message = "A short message is required.";
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setValues(initialValues);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let's connect"
      subtitle="Have a question, collaboration idea, or opportunity? Send a message and I'll reply soon."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left — connect card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6"
        >
          <h3 className="font-display text-2xl font-semibold text-[var(--text)]">Connect</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Open to research and collaborative projects in AI and digital transformation.
          </p>
          <ContactLinks />
        </motion.div>

        {/* Right — form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6"
        >
          <div className="grid gap-4">
            <ContactField
              label="Name"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
            />
            <ContactField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />

            {/* Textarea with floating label */}
            <div className="group relative">
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, message: e.target.value }));
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                placeholder=" "
                className="peer w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 pb-3 pt-6 text-[var(--text)] outline-none transition-all duration-300 focus:border-[var(--accent)]/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(141,213,230,0.08)]"
              />
              <label
                htmlFor="message"
                className="pointer-events-none absolute left-4 top-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)] transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[var(--accent)]"
              >
                Message
              </label>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-red-400"
                >
                  {errors.message}
                </motion.p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              className="interactive mt-2 flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[#0b1220] shadow-[0_10px_30px_-14px_rgba(141,213,230,0.7)] transition-all hover:bg-[var(--accent-strong)] disabled:opacity-60"
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Sent!
                  </motion.span>
                ) : sending ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
