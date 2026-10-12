import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const loadOrderId = () => {
  try { return localStorage.getItem('orderId'); } catch { return null; }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderIdState] = useState(loadOrderId());

  const setOrderId = (id) => {
    setOrderIdState(id);
    try {
      if (id) localStorage.setItem('orderId', id);
      else localStorage.removeItem('orderId');
    } catch {}
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i._id === item._id);
      if (found) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart, addToCart, changeQty, clearCart, total, count,
        open, setOpen, orderId, setOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}