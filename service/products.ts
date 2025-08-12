import { Product } from "@/app/interfaces";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("❌ Falta configurar NEXT_PUBLIC_API_URL en el entorno");
}
// Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {

 const res = await fetch(`${apiUrl}/products`, {
  headers: {
    "Accept": "application/json",
  }
});

  const data = await res.json();
  return data;
};

// Obtener los productos destacados (primeros 3)
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.slice(0, 3);
};

// Obtener un producto por su ID
export const getProductsId = async (id: number): Promise<Product> => {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  return product;
};