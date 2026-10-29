import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '../../components/MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export default function useProjectStack(ref) {
  const { enabled } = useMotion();

  useLayoutEffect(() => {
    if (!enabled) return;
    const stack = ref.current;
    const cards = [...stack.querySelectorAll('.feature-card')];
    const anchors = [...stack.querySelectorAll('.stack-anchor')];
    let top = 104;
    const measure = () => {
      // Tall cards finish entering the viewport before the next card covers them.
      const height = Math.max(...cards.map((card) => card.offsetHeight));
      top = Math.min(window.innerWidth > 650 ? 104 : 80, window.innerHeight - height - 24);
      stack.style.setProperty('--stack-top', `${top}px`);
    };
    measure();
    const ctx = gsap.context(() => {
      cards.slice(0, -1).forEach((card, index) => {
        gsap.to(card.querySelector('.feature-surface'), {
          scale: 0.955,
          y: -8,
          filter: 'brightness(0.68)',
          ease: 'none',
          scrollTrigger: {
            trigger: anchors[index + 1],
            start: () =>
              `top ${Math.min(window.innerHeight * 0.85, top + card.offsetHeight * 0.85)}px`,
            end: () => `top ${top}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, stack);
    // Use the same measurements for resize, font loading and expanded project content.
    ScrollTrigger.addEventListener('refreshInit', measure);
    ScrollTrigger.refresh();

    const revealFocusedCard = (event) => {
      if (!event.target.matches(':focus-visible')) return;
      const card = event.target.closest('.feature-card');
      const index = cards.indexOf(card);
      if (index < 0) return;
      const box = event.target.getBoundingClientRect();
      const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
      if (!event.target.contains(hit)) {
        let offset = 0;
        let element = event.target;
        while (element && element !== card) {
          offset += element.offsetTop;
          element = element.offsetParent;
        }
        const visibleTop = Math.min(
          window.innerWidth > 650 ? 104 : 80,
          window.innerHeight - offset - event.target.offsetHeight - 24,
        );
        window.scrollTo({
          top: anchors[index].getBoundingClientRect().top + window.scrollY - visibleTop,
          behavior: 'instant',
        });
      }
    };
    stack.addEventListener('focusin', revealFocusedCard);
    return () => {
      stack.removeEventListener('focusin', revealFocusedCard);
      ScrollTrigger.removeEventListener('refreshInit', measure);
      ctx.revert();
      stack.style.removeProperty('--stack-top');
    };
  }, [enabled, ref]);
}
