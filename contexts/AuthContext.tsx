"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Order, UserSession } from "@/app/interfaces";

interface AuthContextProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  logout: () => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: () => {},
  orders: [],
  setOrders: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  // Cargar user y sus órdenes al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        const storedOrders = localStorage.getItem(
          `orders-${parsedUser.user.id}`
        );
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch {
        setUser(null);
        setOrders([]);
      }
    }
  }, []);

  // Guardar user si cambia
  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem(`orders-${user.user.id}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders([]);
      }
    }
  }, [user]);

  // Guardar órdenes asociadas al usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders-${user.user.id}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const logout = () => {
    if (confirm("¿Deseas cerrar sesión?")) {
      if (user) {
        // Limpia las órdenes del usuario actual solo del contexto
        localStorage.removeItem(`orders-${user.user.id}`);
        localStorage.removeItem("user");
      }
      setUser(null);
      setOrders([]);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, orders, setOrders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
