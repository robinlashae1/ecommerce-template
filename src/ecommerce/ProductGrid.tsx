import type { Product } from "../types/ecommerce";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
  emptyMessage?: string;
  showQuickAdd?: boolean;
}

export function ProductGrid({
  products,
  columns = 4,
  className = "",
  emptyMessage = "No products found.",
  showQuickAdd = false,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-2xl bg-gray-50 px-6 text-center">
        <p className="text-sm text-gray-500">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const columnStyles = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div
      className={[
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6",
        columnStyles[columns],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showQuickAdd={showQuickAdd}
        />
      ))}
    </div>
  );
}