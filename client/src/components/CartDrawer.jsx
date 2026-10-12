import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../Context/CartContext';
import { API_URL } from '../config';


const API = `${API_URL}/api/orders`;

const STEPS = [
  { key: 'Received', label: 'Order mil gaya', icon: '📝' },
  { key: 'Cooking', label: 'Pak raha hai', icon: '🔥' },
  { key: 'Packing', label: 'Pack ho raha hai', icon: '📦' },
  { key: 'On the way', label: 'Rider nikal gaya', icon: '🛵' },
  { key: 'Delivered', label: 'Pohanch gaya', icon: '🎉' },
];

export default function CartDrawer() {
  const {
    cart, changeQty, clearCart, total,
    open, setOpen, orderId, setOrderId,
  } = useCart();

  const [view, setView] = useState('cart'); // cart | form | track
  const [form, setForm] = useState({ customerName: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  // Drawer khulne par sahi view
  useEffect(() => {
    if (open) setView(orderId && cart.length === 0 ? 'track' : 'cart');
  }, [open]);

  // Order ka status har 4 second baad check
  useEffect(() => {
    if (!orderId) return;
    const load = () =>
      axios
        .get(`${API}/${orderId}`)
        .then((r) => setOrder(r.data))
        .catch(() => {});
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, [orderId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(API, {
        ...form,
        items: cart.map((i) => ({
          menuItem: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        totalPrice: total,
      });
      setOrderId(res.data._id);
      setOrder(res.data);
      clearCart();
      setView('track');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Order nahi ho saka, dobara koshish karein'
      );
    }
    setLoading(false);
  };

  const current = order ? STEPS.findIndex((s) => s.key === order.status) : 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="drawer-head">
              <h3>
                {view === 'cart' && 'Aap ka Cart'}
                {view === 'form' && 'Delivery Details'}
                {view === 'track' && 'Order Tracking'}
              </h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* ---------- CART ---------- */}
            {view === 'cart' && (
              <>
                {cart.length === 0 && <p className="center">Cart khali hai 🍽️</p>}
                <div className="drawer-items">
                  {cart.map((item) => (
                    <div key={item._id} className="cart-row">
                      <div>
                        <strong>{item.name}</strong>
                        <p>Rs {item.price}</p>
                      </div>
                      <div className="qty">
                        <button onClick={() => changeQty(item._id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQty(item._id, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="drawer-foot">
                  <div className="total">
                    <span>Total</span>
                    <strong>Rs {total}</strong>
                  </div>
                  <button
                    className="checkout-btn"
                    disabled={cart.length === 0}
                    onClick={() => setView('form')}
                  >
                    Checkout karein
                  </button>
                  {orderId && (
                    <button className="link-btn" onClick={() => setView('track')}>
                      Pichla order track karein →
                    </button>
                  )}
                </div>
              </>
            )}

            {/* ---------- FORM ---------- */}
            {view === 'form' && (
              <form className="checkout-form" onSubmit={submit}>
                <input
                  name="customerName"
                  placeholder="Aap ka naam"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="address"
                  rows="3"
                  placeholder="Poora pata"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
                <div className="total">
                  <span>Total</span>
                  <strong>Rs {total}</strong>
                </div>
                <p className="pay-note">💵 Payment: Cash on Delivery</p>
                {error && <p className="error">{error}</p>}
                <button className="checkout-btn" disabled={loading}>
                  {loading ? 'Order ja raha hai...' : 'Order confirm karein'}
                </button>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setView('cart')}
                >
                  ← Wapis cart
                </button>
              </form>
            )}

            {/* ---------- TRACKING ---------- */}
            {view === 'track' && order && (
              <div className="track">
                <p className="track-id">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>

                <div className="timeline">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.key}
                      className={`t-step ${i < current ? 'done' : ''} ${
                        i === current ? 'now' : ''
                      }`}
                    >
                      <div className="t-dot">{s.icon}</div>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="track-items">
                  {order.items.map((it, idx) => (
                    <p key={idx}>
                      {it.quantity} × {it.name}
                    </p>
                  ))}
                  <strong>Total: Rs {order.totalPrice}</strong>
                </div>

                <button
                  className="link-btn"
                  onClick={() => {
                    setOrderId(null);
                    setOrder(null);
                    setView('cart');
                  }}
                >
                  + Naya order
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}