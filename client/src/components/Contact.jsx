import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | flying | done

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // baad mein backend se jodenge
    setStatus('flying');
    setTimeout(() => setStatus('done'), 900);
    setForm({ name: '', phone: '', message: '' });
    setTimeout(() => setStatus('idle'), 9000);
  };

  const gone = status !== 'idle';

  return (
    <section id="contact" className="contact2">
      <h2 className="section-title">Sawal Ya Feedback</h2>

      <div className="c-wrap">
        <div className="pad-area">
          <motion.form
            className="slip"
            onSubmit={handleSubmit}
            animate={
              gone
                ? { y: -520, x: 240, rotate: 28, opacity: 0, scale: 0.5 }
                : { y: 0, x: 0, rotate: -2, opacity: 1, scale: 1 }
            }
            transition={{ duration: gone ? 0.9 : 0.6, ease: 'easeIn' }}
            style={{ pointerEvents: gone ? 'none' : 'auto' }}
          >
            <div className="pin"></div>
            <p className="slip-head">Sawal / Feedback</p>
            <input name="name" placeholder="Naam:" value={form.name} onChange={handleChange} required />
            <input name="phone" placeholder="Phone:" value={form.phone} onChange={handleChange} required />
            <textarea
              name="message"
              rows="4"
              placeholder="Sawal, feedback ya party order ki baat likhein"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Parchi kitchen bhejein ➜</button>
          </motion.form>

          {status === 'done' && (
            <div className="delivered">
              <div className="road">
                <span className="rider">🛵</span>
              </div>
              <motion.p
                className="slip-done"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                Parchi kitchen pohanch gayi 👨‍🍳
                <br />
                Hum jald rabta karenge!
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <Link to="/menu" className="order-link">
                  Khana order karein →
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        <motion.div
          className="c-side"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="c-small">Khana order karna hai?</p>
          <Link to="/menu" className="order-link">Menu se dishes chunein →</Link>
          <p className="c-small">Rider seedha aap ke ghar tak laayega.</p>

          <div className="c-sep"></div>

          <p className="c-small">Foran baat karni hai?</p>
          <a
            className="neon-wa"
            href="https://wa.me/920000000000?text=Assalam o Alaikum"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>

    <footer className="footer2">
  <span>Raat abhi baqi hai</span> 🌙 © 2026 Nawab's Table, Multan
  {' · '}
  <Link to="/admin" style={{ opacity: 0.4, color: 'inherit' }}>Staff</Link>
</footer>
    </section>
  );
}