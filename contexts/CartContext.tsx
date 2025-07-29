

"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthContext";

export interface Cart {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  addToCart: (item: Cart) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  emptyCart: () => {},
});

const CART_EXPIRATION_HOURS = 1;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart[]>([]);
  const { user } = useAuth();
  const userId = user?.user?.id;

  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`cart-${userId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const savedTime = new Date(parsed.timestamp);
          const now = new Date();
          const hoursPassed =
            (now.getTime() - savedTime.getTime()) / (1000 * 60 * 60);

          if (hoursPassed > CART_EXPIRATION_HOURS) {
            localStorage.removeItem(`cart-${userId}`);
            setCart([]);
            alert("Tu carrito expiró por inactividad.");
          } else {
            setCart(parsed.items || []);
          }
        } catch {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const now = new Date();
      const data = {
        items: cart,
        timestamp: now.toISOString(),
      };
      localStorage.setItem(`cart-${userId}`, JSON.stringify(data));
    }
  }, [cart, userId]);

  const emptyCart = () => {
    if (userId) {
      localStorage.removeItem(`cart-${userId}`);
    }
    setCart([]);
  };

  const addToCart = (item: Cart) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);