import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FoodJourney() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.journey',
          start: 'top top',
          end: '+=3500',
          scrub: 1,
          pin: true,
        },
      });

      // Step 0: pehla text gayab
      tl.to('.j-intro', { opacity: 0, y: -40, duration: 1 })

        // Step 1: plate aati hai
        .fromTo('.j-plate', { scale: 0, rotate: -180, opacity: 0 },
                { scale: 1, rotate: 0, opacity: 1, duration: 2 })
        .to('.j-label-1', { opacity: 1, duration: 0.5 }, '<1')
        .to('.j-label-1', { opacity: 0, duration: 0.5 }, '+=1')

        // Step 2: naan girta hai
        .fromTo('.j-naan', { y: -500, opacity: 0, rotate: -90, scale: 0.5 },
                { y: 0, opacity: 1, rotate: 0, scale: 1, duration: 2 })
        .to('.j-label-2', { opacity: 1, duration: 0.5 }, '<1')
        .to('.j-label-2', { opacity: 0, duration: 0.5 }, '+=1')

        // Step 3: salan pour hota hai
        .fromTo('.j-salan', { y: -500, opacity: 0, scale: 0.4 },
                { y: 0, opacity: 1, scale: 1, duration: 2 })
        .to('.j-label-3', { opacity: 1, duration: 0.5 }, '<1')
        .to('.j-label-3', { opacity: 0, duration: 0.5 }, '+=1')

        // Step 4: garnish girte hain
        .fromTo('.j-g1', { y: -600, opacity: 0, rotate: 0 },
                { y: 0, opacity: 1, rotate: 360, duration: 1.5 })
        .fromTo('.j-g2', { y: -600, opacity: 0, rotate: 0 },
                { y: 0, opacity: 1, rotate: -360, duration: 1.5 }, '<0.3')
        .fromTo('.j-g3', { y: -600, opacity: 0, rotate: 0 },
                { y: 0, opacity: 1, rotate: 360, duration: 1.5 }, '<0.3')
        .to('.j-label-4', { opacity: 1, duration: 0.5 }, '<1')
        .to('.j-label-4', { opacity: 0, duration: 0.5 }, '+=1')

        // Step 5: steam + final text
        .fromTo('.j-steam', { y: 40, opacity: 0, scale: 0.5 },
                { y: -80, opacity: 0.8, scale: 1.4, duration: 2, stagger: 0.4 })
        .to('.j-plate-group', { scale: 1.15, duration: 2 }, '<')
        .fromTo('.j-final', { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.5 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="journey">
      <div className="journey">
        <div className="j-intro">
          <p className="hero-small">Ek safar</p>
          <h2 className="section-title">Khana kaise banta hai?</h2>
          <p className="center">Scroll karein ↓</p>
        </div>

        <div className="j-plate-group">
          <div className="j-plate">🍽️</div>
          <div className="j-naan">🫓</div>
          <div className="j-salan">🍲</div>
          <div className="j-g1">🌿</div>
          <div className="j-g2">🌶️</div>
          <div className="j-g3">🍋</div>
          <div className="j-steam s-a">💨</div>
          <div className="j-steam s-b">💨</div>
          <div className="j-steam s-c">💨</div>
        </div>

        <p className="j-label j-label-1">Pehle, saaf plate</p>
        <p className="j-label j-label-2">Phir, garma garam naan</p>
        <p className="j-label j-label-3">Uske upar, khushboodar salan</p>
        <p className="j-label j-label-4">Aakhir mein, taza garnish</p>

        <h2 className="j-final neon-sm">Aap ka khana tayyar hai 🔥</h2>
      </div>
    </section>
  );
}