import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function timeInfo() {
  const d = new Date();
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const h12 = h % 12 === 0 ? 12 : h % 12;

  let period = 'raat';
  if (h >= 5 && h < 12) period = 'subah';
  else if (h >= 12 && h < 16) period = 'dopahar';
  else if (h >= 16 && h < 19) period = 'shaam';

  return `${h12}:${m} ${period}`;
}

export default function Hero() {
  const [phase, setPhase] = useState('off'); // off | lit | on
  const [now, setNow] = useState(timeInfo());
  const busy = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setNow(timeInfo()), 20000);
    return () => clearInterval(t);
  }, []);

  const buzz = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = 110;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 1.2);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    } catch (e) {}
  };

  const turnOn = () => {
    if (busy.current || phase === 'on') return;
    busy.current = true;
    buzz();

    const steps = [
      ['lit', 0], ['off', 90], ['lit', 160], ['off', 260],
      ['off', 330], ['lit', 420], ['off', 520], ['lit', 600],
      ['off', 760], ['lit', 840], ['on', 1100],
    ];
    steps.forEach(([s, t]) => setTimeout(() => setPhase(s), t));
  };

  const isOn = phase === 'on';
  const glowing = phase !== 'off';

  return (
    <section id="home" className={`hero wall ${glowing ? 'glow' : 'dark'}`}>
      <div className="wall-dim"></div>

      <div className="sign-wrap">
        <div className={`sign-board ${glowing ? 'board-on' : 'board-off'}`}>
          <p className={`hero-small fade ${isOn ? 'show' : ''}`}>
            Multan ka asli swaad
          </p>
          <h1 className={`neon sign ${phase}`} onClick={turnOn}>
            Nawab's Table
          </h1>
        </div>
      </div>

      {!isOn && <p className="sign-hint">👆 Neon sign pe click karein</p>}

      <p className={`open-now fade ${isOn ? 'show' : ''}`}>
        <i></i>
        Abhi {now}, Nawab's Table khula hai
      </p>

      <p className={`hero-sub fade ${isOn ? 'show' : ''}`}>
        Raat bhar khula, dil bhar ke khana 🍽️
      </p>
      <Link to="/menu" className={`hero-btn fade ${isOn ? 'show' : ''}`}>
        Menu Dekhein →
      </Link>
    </section>
  );
}