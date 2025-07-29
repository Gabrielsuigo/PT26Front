"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { postOrders } from "@/service/orders";
import { useState } from "react";

const CartDetail = () => {
  const { user, orders, setOrders } = useAuth();
  const { cart, emptyCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [loading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    setIsLoading(true);

    const res = await postOrders(user?.user.id || 0, user?.token || "", cart);

    if (res.status === "approved") {
      const newOrder = {
        id: parseInt(res.id),
        products: cart,
        total: total,
        status: res.status || "approved",
        createdAt: new Date().toISOString(),
      };

      setOrders([...orders, newOrder]);

      const fullOrderData = {
        user: {
          id: user?.user,
          name: user?.user.name,
          email: user?.user.email,
        },
        products: cart,
        total: total,
        orderId: parseInt(res.id),
        date: new Date().toISOString(),
      };

      // Guardar orden completa
      localStorage.setItem(
        `compra-${user?.user.id}-${res.id}`,
        JSON.stringify(fullOrderData)
      );

      // Actualizar historial de órdenes
      const prevOrders = JSON.parse(
        localStorage.getItem(`orders-${user?.user.id}`) || "[]"
      );
      localStorage.setItem(
        `orders-${user?.user.id}`,
        JSON.stringify([...prevOrders, newOrder])
      );

      // Guardar usuario (opcional)
      localStorage.setItem("user", JSON.stringify(user));

      alert(`Order ID: ${res.id}`);
      emptyCart();
    } else {
      alert("Error al procesar la orden");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-6 py-12 bg-white dark:bg-black text-black dark:text-white rounded-3xl border border-gray-300 dark:border-gray-700 shadow-xl transition-colors">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold tracking-tight">🛒 Tu Carrito</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Revisa los productos antes de comprar
        </p>
      </div>

      {cart?.length === 0 ? (
        <h3 className="text-center text-gray-500 dark:text-gray-400">
          Tu carrito está vacío
        </h3>
      ) : (
        <div className="space-y-6">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-6 rounded-xl border border-gray-300 dark:border-gray-700"
            >
              <div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ${(+item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-xl font-semibold mb-4">Total: ${total.toFixed(2)}</p>
        <div className="flex justify-center">
          <button
            onClick={handleBuy}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
            }`}
          >
            {loading ? (
              <>
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  <div className="absolute inset-1 rounded-full border-2 border-t-transparent border-gray-300 animate-spin reverse"></div>
                </div>
                Procesando...
              </>
            ) : (
              "Comprar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
