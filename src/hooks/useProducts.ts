import { useMemo } from "react";

import { products } from "../data/products";

export function useProducts() {
  const featuredProducts = useMemo(() => {
    return products.filter((product) => product.featured);
  }, []);

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((product) => product.slug === slug);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getProductsByTag = (tag: string) => {
    return products.filter((product) =>
      product.tags?.some(
        (productTag) =>
          productTag.toLowerCase() === tag.toLowerCase()
      )
    );
  };

  const searchProducts = (query: string) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description
          .toLowerCase()
          .includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.tags?.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery)
        )
      );
    });
  };

  return {
    products,
    featuredProducts,
    getProductById,
    getProductBySlug,
    getProductsByCategory,
    getProductsByTag,
    searchProducts,
  };
}