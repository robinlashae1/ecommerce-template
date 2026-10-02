import type { Product } from "../types/ecommerce";

export const products: Product[] = [
  {
    id: "1",
    slug: "classic-t-shirt",
    name: "Classic T-Shirt",
    description:
      "A comfortable everyday t-shirt made from premium cotton.",
    price: 35,
    images: [
      "/images/products/tshirt-1.jpg",
      "/images/products/tshirt-2.jpg",
    ],
    category: "Clothing",
    tags: ["new", "bestseller"],
    inStock: true,
    featured: true,
  },

  {
    id: "2",
    slug: "everyday-hoodie",
    name: "Everyday Hoodie",
    description:
      "A heavyweight hoodie designed for everyday comfort.",
    price: 75,
    images: [
      "/images/products/hoodie-1.jpg",
      "/images/products/hoodie-2.jpg",
    ],
    category: "Clothing",
    tags: ["bestseller"],
    inStock: true,
    featured: true,
  },
];