import { useCallback, useRef, useState } from "react";

export function useCardTilt({ max = 6, perspective = 1000 } = {}) {
  const [transform, setTransform] = useState("");
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;
      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
      );
    },
    [max, perspective]
  );

  const onMouseLeave = useCallback(() => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`);
  }, [perspective]);

  return {
    style: {
      transform,
      transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "transform",
    },
    onMouseMove,
    onMouseLeave,
    ref,
  };
}
