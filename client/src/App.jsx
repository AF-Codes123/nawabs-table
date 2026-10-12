import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';
import { CartProvider } from './Context/CartContext';
import Embers from './components/Embers';
import Torch from './components/Torch';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Address from './components/Address';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import Admin from './components/Admin';

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CartProvider>
      {/* Admin page par torch aur chingariyan nahi, taake saaf padha jaye */}
      {!isAdmin && <Embers />}
      {!isAdmin && <Torch />}
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Hero /></Page>} />
          <Route path="/menu" element={<Page><Menu /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/address" element={<Page><Address /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/admin" element={<Page><Admin /></Page>} />
        </Routes>
      </AnimatePresence>

      <CartDrawer />
    </CartProvider>
  );
}

export default App;