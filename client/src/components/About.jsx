import { motion } from 'framer-motion';

const rows = [
  ['Khush Customers', '10,000+'],
  ['Hamesha Khula', '24/7'],
  ['Google Rating', '4.1 ★'],
  ['Desi Dishes', '30+'],
];

export default function About() {
  return (
    <section id="about" className="about2">
      <motion.div
        className="chalk"
        initial={{ opacity: 0, x: -80, rotate: -4 }}
        whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Hamari Kahani</h2>
        <p>
          Nawab's Table Multan ki wo roshni hai jahan raat kabhi khatam nahi hoti.
          Kayi saalon se hum koyle ke tikke, karahi aur garma garam naan us ishq
          se bana rahe hain jo har nawab ke dastarkhwan ki shaan hota hai.
        </p>
        <p>
          Usool simple hai: taza saman, asli masale, aur har plate mein apnaiyat.
          Family ho ya raat ko dosto ki mehfil, yahan sab ke liye jagah hai.
        </p>
        <span className="chalk-sign">~ Nawab ke dhaba se ✿</span>
      </motion.div>

      <motion.div
        className="parchi"
        initial={{ opacity: 0, y: 80, rotate: 5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="stamp">TAAZA</div>
        <p className="p-title">NAWAB'S TABLE</p>
        <p className="p-sub">Sher Shah, Multan</p>
        <p className="p-line">- - - - - - - - - - - - - - - -</p>

        {rows.map(([name, val], i) => (
          <motion.div
            key={name}
            className="p-row"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.35 }}
          >
            <span>{name}</span>
            <i className="dots"></i>
            <b>{val}</b>
          </motion.div>
        ))}

        <p className="p-line">- - - - - - - - - - - - - - - -</p>
        <motion.div
          className="p-total"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2 }}
        >
          <span>Total Muhabbat</span>
          <b>Be-hisaab ❤</b>
        </motion.div>
        <p className="p-thanks">Phir aaiyega!</p>
      </motion.div>
    </section>
  );
}