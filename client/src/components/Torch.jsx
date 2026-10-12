import { useEffect, useRef } from 'react';

export default function Torch() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.4;

    const apply = () => {
      raf = null;
      if (!ref.current) return;
      ref.current.style.setProperty('--tx', x + 'px');
      ref.current.style.setProperty('--ty', y + 'px');
    };

    const move = (e) => {
      const p = e.touches ? e.touches[0] : e;
      x = p.clientX;
      y = p.clientY;
      if (!raf) raf = requestAnimationFrame(apply); // ek frame mein sirf ek update
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="torch" />;
}