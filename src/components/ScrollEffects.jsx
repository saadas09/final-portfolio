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
      gsap.fromTo(
        '.manifesto-word',
        { opacity: 0.22 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: '.manifesto', start: 'top 75%', end: 'bottom 70%', scrub: 1 },
        },
      );
      gsap.to('.hero-name', {
        yPercent: 35,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        const cards = gsap.utils.toArray('.feature-card');
        cards.slice(0, -1).forEach((card, i) =>
          gsap.to(card.querySelector('.feature-surface'), {
            scale: 0.94,
            filter: 'brightness(0.65)',
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 75%',
              end: 'top 125px',
              scrub: true,
            },
          }),
        );
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
