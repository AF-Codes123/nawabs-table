import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCart } from '../Context/CartContext';
import { API_URL } from '../config';

const categories = ['All', 'BBQ', 'Karahi', 'Rice', 'Bread', 'Dessert', 'Drinks'];

const emoji = {
  BBQ: '🍢',
  Karahi: '🍲',
  Rice: '🍚',
  Bread: '🥖',
  Dessert: '🍮',
  Drinks: '🍹',
};

// Har category ka hover effect
const fxType = {
  BBQ: 'fire',
  Karahi: 'fire',
  Bread: 'fire',
  Rice: 'steam',
  Dessert: 'sweet',
  Drinks: 'cool',
};

function Effect({ type }) {
  if (type === 'fire') {
    return (
      <div className="flames">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    );
  }
  return (
    <div className={`fx fx-${type}`}>
      {Array.from({ length: 7 }).map((_, i) => (
        <span key={i}></span>
      ))}
    </div>
  );
}

// "Malai Boti" -> "malai-boti"
const slug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const override = {
  'Chicken Tikka': 'tikka',
  'Seekh Kabab': 'seekh-kabab',
  'Chicken Biryani': 'biryani',
  'Butter Naan': 'naan',
};

const folders = ['images', 'Images'];
const exts = ['jfif', 'jpg', 'png', 'jpeg', 'webp'];
const tries = folders.flatMap((f) => exts.map((e) => ({ f, e })));

function DishImg({ item }) {
  const [n, setN] = useState(0);
  const name = override[item.name] || slug(item.name);

  if (n >= tries.length) return <>{emoji[item.category]}</>;

  const t = tries[n];
  return (
    <img
      src={`/${t.f}/${name}.${t.e}`}
      alt={item.name}
      loading="lazy"
      onError={() => setN(n + 1)}
    />
  );
}

export default function Menu() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
       .get(`${API_URL}/api/menu`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

    const order = ['BBQ', 'Karahi', 'Rice', 'Bread', 'Dessert', 'Drinks'];
const shown = (
  active === 'All' ? items : items.filter((i) => i.category === active)
)
  .slice()
  .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));

  return (
    <section id="menu" className="menu">
      <h2 className="section-title">Nawab's Table Menu</h2>

      <div className="tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={`tab ${active === c ? 'active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="center">Tawa garam ho raha hai...</p>}

      <div className="tawa">
        <div className="grid">
          {shown.map((item, i) => {
            const type = fxType[item.category] || 'fire';
            return (
              <motion.div
                key={item._id}
                className={`card is-${type}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <Effect type={type} />

                <div className="card-img">
                  <DishImg item={item} />
                </div>

                <h3>
                  {item.name} {item.isSpicy && '🌶️'}
                </h3>
                <p className="desc">{item.description}</p>

                <div className="card-bottom">
                  <span className="price">Rs {item.price}</span>
                  <span className="rating">⭐ {item.rating}</span>
                </div>

                <button className="add-btn" onClick={() => addToCart(item)}>
                  + Cart mein daalein
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}