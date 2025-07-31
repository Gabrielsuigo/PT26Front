"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

import { Product } from "@/app/interfaces";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

import UserWidget from "../UserWidget/UserWidget";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  // const router = useRouter();
  const { user } = useAuth();
  const { cart } = useCart();

  // Fetch dinámico con debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const search = async () => {
        if (searchTerm.trim().length >= 2) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/products?name=${searchTerm}`
            );
            if (res.ok) {
              const data = await res.json();
              setFilteredProducts(data);
              setShowResults(true);
            } else {
              setFilteredProducts([]);
              setShowResults(false);
            }
          } catch (error) {
            console.error("Error buscando productos:", error);
            setFilteredProducts([]);
            setShowResults(false);
          }
        } else {
          setFilteredProducts([]);
          setShowResults(false);
        }
      };

      search();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = () => {
    setSearchTerm("");
    setFilteredProducts([]);
    setShowResults(false);
  };

  return (
    <>
 <nav className="bg-white dark:bg-black text-black dark:text-white py-4 shadow-md border-b border-neutral-200 dark:border-neutral-800 z-50 relative">
  <div className="flex items-center justify-between gap-4 px-4 sm:px-6 w-full">
    
    {/* Logo */}
    <Link
      href="/"
      className="flex items-center hover:scale-105 transition duration-300 shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="w-8 h-8 fill-black dark:fill-white"
      >
        <path d="M318.7 268.1c-.3-45.5 ... [recortado por claridad] ..." />
      </svg>
    </Link>

    {/* SearchBar */}
    <div className="flex-1 mx-2">
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
    </div>

    {/* Íconos */}
    <div className="flex items-center gap-4 shrink-0">
      {user && cart && (
        <Link href="/cart" className="relative group">
          <ShoppingCart className="w-6 h-6 text-black dark:text-white transition" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      )}
      <UserWidget />
    </div>
  </div>
</nav>

      {/* Resultados en overlay */}
      {showResults && filteredProducts.length > 0 && (
        <SearchResults products={filteredProducts} onClick={handleProductClick} />
      )}
    </>
  );
};

export default Navbar;