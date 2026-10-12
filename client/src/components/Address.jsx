import { motion } from 'framer-motion';

export default function Address() {
  return (
    <section id="address" className="addr">
      <h2 className="section-title">Raasta Yahan Se</h2>

      <div className="addr-grid">
        <motion.div
          className="roadsign"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="rs-board">
            <p className="rs-top">NAWAB'S TABLE</p>
            <div className="rs-line"><span>➜</span> Multan - Muzaffargarh Road</div>
            <div className="rs-line"><span>➜</span> Chenab East Bank, Sher Shah</div>
            <div className="rs-line"><span>➜</span> PSO Filling Station ke qareeb</div>
            <div className="rs-tags">
              <em>Dine-in</em><em>Drive-through</em><em>Delivery</em>
            </div>
          </div>
          <div className="rs-posts"><i></i><i></i></div>

          <div className="neon-open">OPEN 24 HRS</div>

          <a
            className="rs-btn"
            href="https://www.google.com/maps/dir/?api=1&destination=30.1822252,71.3098461"
            target="_blank"
            rel="noreferrer"
          >
            Raasta Dekhein →
          </a>
        </motion.div>

        <motion.div
          className="night-map"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            title="Nawab's Table location"
            src="https://www.google.com/maps?q=30.1822252,71.3098461&z=15&output=embed"
            loading="lazy"
          ></iframe>
          <div className="ping"><span></span><span></span><b></b></div>
        </motion.div>
      </div>
    </section>
  );
}