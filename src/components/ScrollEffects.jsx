import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from './MotionProvider';
gsap.registerPlugin(ScrollTrigger);
export default function ScrollEffects() {
  const { enabled } = useMotion();
  useLayoutEffect(() => {
    if (!enabled) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 94%', once: true },
          },
        );
      });
      gsap.to('.hero-name', {
        yPercent: 35,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    });
    let live = true;
    let frame;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (live) ScrollTrigger.refresh();
      });
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(document.querySelector('main'));
    document.fonts.ready.then(() => {
      if (live) refresh();
    });
    return () => {
      live = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      ctx.revert();
    };
  }, [enabled]);
  return null;
}
