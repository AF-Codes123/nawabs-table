import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const API = `${API_URL}/api`;

const STATUSES = ['Received', 'Cooking', 'Packing', 'On the way', 'Delivered'];
const LABEL = {
  Received: '📝 Naya order',
  Cooking: '🔥 Pak raha hai',
  Packing: '📦 Pack ho raha hai',
  'On the way': '🛵 Rider nikla',
  Delivered: '🎉 Deliver ho gaya',
};
const CATS = ['BBQ', 'Karahi', 'Rice', 'Bread', 'Dessert', 'Drinks'];

export default function Admin() {
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem('adminToken') || ''; } catch { return ''; }
  });
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '', description: '', price: '', category: 'BBQ', isSpicy: false,
  });

  const auth = { headers: { Authorization: `Bearer ${token}` } };

  const logout = () => {
    setToken('');
    try { localStorage.removeItem('adminToken'); } catch {}
  };

  const doLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API}/auth/login`, login);
      if (res.data.role !== 'admin') return setError('Ye account admin nahi hai');
      setToken(res.data.token);
      try { localStorage.setItem('adminToken', res.data.token); } catch {}
    } catch (err) {
      setError(err.response?.data?.message || 'Login nahi ho saka');
    }
  };

  const loadOrders = () =>
    axios
      .get(`${API}/orders`, auth)
      .then((r) => setOrders(r.data))
      .catch((err) => { if (err.response?.status === 401) logout(); });

  const loadMenu = () =>
    axios.get(`${API}/menu`).then((r) => setMenu(r.data)).catch(() => {});

  // Orders har 5 second baad khud update
  useEffect(() => {
    if (!token) return;
    loadOrders();
    loadMenu();
    const t = setInterval(loadOrders, 5000);
    return () => clearInterval(t);
  }, [token]);

  const setStatus = async (id, status) => {
    await axios.put(`${API}/orders/${id}/status`, { status }, auth);
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  const addItem = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/menu`, { ...newItem, price: Number(newItem.price) }, auth);
    setNewItem({ name: '', description: '', price: '', category: 'BBQ', isSpicy: false });
    loadMenu();
  };

  const deleteItem = async (id, name) => {
    if (!window.confirm(`"${name}" delete karna hai?`)) return;
    await axios.delete(`${API}/menu/${id}`, auth);
    loadMenu();
  };

  /* ---------- LOGIN ---------- */
  if (!token) {
    return (
      <section className="admin-login">
        <form onSubmit={doLogin}>
          <h2>Admin Login</h2>
          <input
            type="email" placeholder="Email" required
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <input
            type="password" placeholder="Password" required
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          {error && <p className="error">{error}</p>}
          <button className="checkout-btn">Login</button>
        </form>
      </section>
    );
  }

  const active = orders.filter((o) => o.status !== 'Delivered');
  const done = orders.filter((o) => o.status === 'Delivered');

  const OrderCard = ({ o }) => {
    const i = STATUSES.indexOf(o.status);
    const next = STATUSES[i + 1];
    return (
      <div className={`a-order st-${i}`}>
        <div className="a-top">
          <strong>#{o._id.slice(-6).toUpperCase()}</strong>
          <span className="a-badge">{LABEL[o.status]}</span>
        </div>
        <p className="a-cust">
          {o.customerName} · {o.phone}
        </p>
        <p className="a-addr">📍 {o.address}</p>
        <ul className="a-items">
          {o.items.map((it, k) => (
            <li key={k}>{it.quantity} × {it.name}</li>
          ))}
        </ul>
        <div className="a-bottom">
          <b>Rs {o.totalPrice}</b>
          <small>{new Date(o.createdAt).toLocaleString()}</small>
        </div>
        {next && (
          <button className="a-next" onClick={() => setStatus(o._id, next)}>
            Agla step: {LABEL[next]} →
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="admin">
      <div className="admin-head">
        <h2>Admin Panel</h2>
        <div>
          <button className={`tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
            Orders ({active.length})
          </button>
          <button className={`tab ${tab === 'menu' ? 'active' : ''}`} onClick={() => setTab('menu')}>
            Menu
          </button>
          <button className="tab" onClick={logout}>Logout</button>
        </div>
      </div>

      {/* ---------- ORDERS ---------- */}
      {tab === 'orders' && (
        <>
          <h3 className="a-sub">Chal rahe orders</h3>
          {active.length === 0 && <p className="center">Abhi koi naya order nahi 🌙</p>}
          <div className="a-grid">
            {active.map((o) => <OrderCard key={o._id} o={o} />)}
          </div>

          {done.length > 0 && (
            <>
              <h3 className="a-sub">Deliver ho chuke</h3>
              <div className="a-grid">
                {done.slice(0, 6).map((o) => <OrderCard key={o._id} o={o} />)}
              </div>
            </>
          )}
        </>
      )}

      {/* ---------- MENU ---------- */}
      {tab === 'menu' && (
        <>
          <form className="a-form" onSubmit={addItem}>
            <h3>Nayi dish add karein</h3>
            <input
              placeholder="Dish ka naam" required value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              placeholder="Chhota sa description" value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <div className="a-row">
              <input
                type="number" placeholder="Price (Rs)" required value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              >
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <label className="a-check">
              <input
                type="checkbox" checked={newItem.isSpicy}
                onChange={(e) => setNewItem({ ...newItem, isSpicy: e.target.checked })}
              />
              Teekha hai 🌶️
            </label>
            <button className="checkout-btn">Dish add karein</button>
            <p className="a-hint">
              Photo ke liye <code>client/public/images/</code> mein dish ke naam se file rakhein
              (jaise "Malai Boti" ke liye <code>malai-boti.jpg</code>).
            </p>
          </form>

          <div className="a-list">
            {menu.map((m) => (
              <div key={m._id} className="a-menu-row">
                <span>
                  <b>{m.name}</b> <small>({m.category})</small>
                </span>
                <span>Rs {m.price}</span>
                <button onClick={() => deleteItem(m._id, m.name)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}