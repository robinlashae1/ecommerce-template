import type { Product } from "../types/ecommerce";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  showQuickAdd?: boolean;
  className?: string;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  showQuickAdd = false,
  className = "",
  emptyMessage = "No products found.",
}: ProductGridProps) {
  /*
   * Empty state
   */
  if (products.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-xl bg-gray-50 px-6 text-center">
        <p className="text-sm text-gray-500">
          {emptyMessage}
        </p>
      </div>
    );
  }

  /*
   * Responsive grid configuration.
   *
   * Mobile:
   * 2 columns
   *
   * Medium:
   * 3 columns
   *
   * Large:
   * Configurable 2 / 3 / 4 columns
   */
  const columnStyles = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div
      className={[
        "grid grid-cols-2 gap-x-4 gap-y-10",
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

