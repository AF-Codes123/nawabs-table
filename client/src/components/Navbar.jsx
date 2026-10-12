import { useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function Navbar() {
  const { count, setOpen } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const clicks = useRef({ n: 0, t: null });

  const logoClick = (e) => {
    const c = clicks.current;
    c.n += 1;
    clearTimeout(c.t);
    c.t = setTimeout(() => (c.n = 0), 1500);
    if (c.n >= 5) {
      e.preventDefault();
      c.n = 0;
      navigate('/admin');
    }
  };

  const close = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={logoClick}>NAWAB'S TABLE</Link>

      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
        <li><NavLink to="/menu" onClick={close}>Menu</NavLink></li>
        <li><NavLink to="/about" onClick={close}>About</NavLink></li>
        <li><NavLink to="/address" onClick={close}>Address</NavLink></li>
        <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
      </ul>

      <div className="nav-right">
        <button className="cart-btn" onClick={() => setOpen(true)}>
          🛒 Cart <span className="badge">{count}</span>
        </button>
        <button
          className={`burger ${menuOpen ? 'x' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}