import { cinematicEase } from "../utils/motion";

export function useScrollAnimation({
  transition = { duration: 0.7, ease: cinematicEase },
  viewport = { amount: 0.2 },
} = {}) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, ...viewport },
    transition,
  };
}
