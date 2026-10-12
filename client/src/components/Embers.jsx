import { useEffect, useRef } from 'react';

export default function Embers() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    let raf;

    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const make = () => ({
      x: Math.random() * w,
      y: h + Math.random() * 200,
      r: Math.random() * 2 + 0.8,
      vy: Math.random() * 0.8 + 0.3,
      a: Math.random() * Math.PI * 2,
      life: Math.random() * 0.5 + 0.5,
    });
    const ps = Array.from({ length: 35 }, make);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (document.hidden) return; // tab chhupa ho to kuch na karo

      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.a += 0.02;
        p.x += Math.sin(p.a) * 0.6;
        p.y -= p.vy;
        p.life -= 0.0015;
        if (p.y < -10 || p.life <= 0) ps[i] = make();
        ctx.fillStyle = `rgba(255,140,40,${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="embers" />;
}