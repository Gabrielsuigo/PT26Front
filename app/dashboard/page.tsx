"use client";

import AuthProtected from "@/components/AuthProtected/AuthProtected";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const page = () => {
  const { user: authUser, orders } = useAuth();
  const { cart } = useCart();
  const user = authUser?.user;

  const totalOrders = orders.length;
  const lastOrder = orders[orders.length - 1];

  const totalAmount = orders.reduce((acc, order) => {
    const orderTotal =
      order.products?.reduce(
        (sum, prod) => sum + prod.price * prod.quantity,
        0
      ) || 0;
    return acc + orderTotal;
  }, 0);

  const cartTotal = cart?.length
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const cartQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <AuthProtected>
      <div className="flex items-center justify-center min-h-screen bg-transparent text-black dark:text-white px-4">
        <div className="w-full max-w-5xl space-y-10 p-10 rounded-3xl border border-neutral-300 dark:border-neutral-700 shadow-xl bg-white/70 dark:bg-black/40 backdrop-blur-sm">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">Bienvenido/a</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-base">
              Información general de tu cuenta y actividad reciente
            </p>
          </header>

          {/* GRID: Datos y Pedidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda - Datos del usuario y resumen */}
            <div className="space-y-6">
              {/* Resumen */}
              <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700 max-h-[500px] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Resumen</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      Pedidos
                    </p>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      Último pedido
                    </p>
                    <p className="text-lg">{lastOrder?.id || "—"}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      Gastado
                    </p>
                    <p className="text-xl font-semibold">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 uppercase mb-1">
                      {" "}
                      Carrito
                    </p>

                    <div className="flex justify-center items-center gap-2">
                      <span className="text-sm">Productos</span>
                      <span className="bg-gray-600 text-white text-sm px-2 py-1 rounded-md font-medium">
                        {cartQuantity}
                      </span>
                    </div>
  <div className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-3 py-1 rounded-xl inline-flex items-center shadow-md">
  <span className="text-xl font-semibold">${cartTotal.toFixed(2)}</span>
</div>
                  </div>
                </div>
              </div>

              {/* Perfil */}
              <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4">
                  Datos del Usuario
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Nombre
                    </p>
                    <p>{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Email
                    </p>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Teléfono
                    </p>
                    <p>{user?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase text-gray-500 mb-1">
                      Dirección
                    </p>
                    <p>{user?.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-gray-300 dark:border-gray-700 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
              <h2 className="text-xl font-semibold mb-4">
                Historial de Pedidos
              </h2>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order, i) => {
                    const orderTotal =
                      order.products?.reduce(
                        (sum, p) => sum + p.price * p.quantity,
                        0
                      ) || 0;

                    return (
                      <div
                        key={i}
                        className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 border border-gray-300 dark:border-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            Pedido #{order.id}
                          </span>
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full ${
                              order.status === "approved"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-gray-400 text-black dark:bg-gray-700 dark:text-white"
                            }`}
                          >
                            {order.status || "pendiente"}
                          </span>
                        </div>

                        {order.createdAt && (
                          <p className="text-sm text-gray-500 mt-1">
                            Fecha:{" "}
                            {new Date(order.createdAt).toLocaleString("es-AR")}
                          </p>
                        )}

                        <p className="text-sm mt-2">
                          💰 Total: ${orderTotal.toFixed(2)}
                        </p>

                        {order.products && order.products.length > 0 && (
                          <div className="mt-2 text-sm">
                            {order.products.map((prod, j) => (
                              <div
                                key={j}
                                className="flex justify-between border-b border-gray-300 dark:border-gray-700 py-1"
                              >
                                <span>
                                  {prod.name} x{prod.quantity}
                                </span>
                                <span>
                                  ${(prod.price * prod.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No hay pedidos registrados.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthProtected>
  );
};

export default page;
