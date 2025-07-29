"use client";

import { Product } from "@/app/interfaces";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

import { Button } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useCart();
  const router = useRouter();
  const { id, name, price, image, description } = product;

  const isOnCart = cart?.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (user?.login) {
      const confirmAdd = confirm("¿Deseas agregar este producto al carrito?");
      if (confirmAdd) {
        const newItem = { id, name, price, quantity: 1 };

        if (Array.isArray(cart)) {
          setCart([...cart, newItem]);
        } else {
          setCart([newItem]);
        }

        alert("¡Producto agregado al carrito!");
      }
    } else {
      alert("Por favor inicia sesión para agregar productos al carrito");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  return (
    <article className="backdrop-blur-md bg-white/30 dark:bg-black/30 text-black dark:text-white rounded-3xl shadow-xl p-6 mt-12 mb-12 max-w-6xl mx-auto border border-black/20 dark:border-white/20 transition-colors">
      <h1 className="text-4xl font-bold mb-6 tracking-tight">{name}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={image}
          alt={name}
          className="w-full lg:w-1/2 rounded-2xl shadow-md object-cover border border-gray-300 dark:border-gray-700"
        />
        <div className="flex flex-col justify-between lg:w-1/2 min-h-[400px]">
          <div>
            <p className="text-lg font-semibold text-black dark:text-gray-300 mb-2">
              Descripción:
            </p>
            <p className="text-base text-black dark:text-gray-400">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Precio:{" "}
              <span className="text-black dark:text-white">u$s {price}</span>
            </p>

            <Button
              variant="contained"
              onClick={isOnCart ? () => router.push("/cart") : handleAddToCart}
              startIcon={<ShoppingCartRoundedIcon />}
              sx={{
                backgroundColor: isOnCart ? "#000" : "#fff",
                color: isOnCart ? "#fff" : "#000",
                border: "1px solid #000",
                "&:hover": {
                  backgroundColor: isOnCart ? "#111" : "#f5f5f5",
                },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "12px",
                px: 2,
                py: 1.5,
              }}
            >
              {isOnCart ? "Ir al carrito" : "Añadir al carrito"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetail;
