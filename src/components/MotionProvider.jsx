import { createContext, useContext, useEffect, useState } from 'react';
const MotionContext = createContext(null);
export function MotionProvider({ children }) {
  const [enabled, setEnabled] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off';
  }, [enabled]);
  return (
    <MotionContext.Provider value={{ enabled, toggle: () => setEnabled((value) => !value) }}>
      {children}
    </MotionContext.Provider>
  );
}
export const useMotion = () => useContext(MotionContext);
