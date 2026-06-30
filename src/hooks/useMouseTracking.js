import { useEffect, useState } from "react";

export function useMouseTracking() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", update);
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return pos;
}
