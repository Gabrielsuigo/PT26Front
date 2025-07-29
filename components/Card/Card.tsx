"use client";

import { Product } from "@/app/interfaces";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface CardProps extends Product {}

const Card = ({ name, image, price, id, ...rest }: CardProps) => {
  const { cart, addToCart } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleCartClick = () => {
    if (cartItem) return (window.location.href = "/cart");
    const product = { id, name, price, quantity: 1, ...rest };
    addToCart(product);
  };

  return (
    <article className="w-[400px] transition-all duration-300 ease-in-out transform hover:shadow-lg p-6 rounded-3xl border border-neutral-300 dark:border-neutral-700 bg-[#f3f4f6] dark:bg-[#1f1f1f] text-black dark:text-white">

      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover rounded-lg mb-4 pointer-events-none"
      />

      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-lg font-medium mb-4">u$s {price}</p>

      <div className="flex justify-between items-center">
        <Link href={`/products/${id}`}>
          <button className="px-4 py-2 border border-black dark:border-white rounded-lg text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-300">
            Ver más
          </button>
        </Link>

        <div className="relative">
          <button
            onClick={handleCartClick}
            className="p-2 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            aria-label="Agregar al carrito"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          {quantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold px-2 py-0.5 rounded-full">
              {quantity}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
