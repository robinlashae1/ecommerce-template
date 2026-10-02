import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import type { Product } from "../../types/ecommerce";
import { useCart } from "../../hooks/useCart";
import { Badge } from "../ui/Badge";
import { Price } from "./Price";

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export function ProductCard({
  product,
  showQuickAdd = false,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const hasSale =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price;

  const discountPercentage = hasSale
    ? Math.round(
        ((product.compareAtPrice! - product.price) /
          product.compareAtPrice!) *
          100
      )
    : 0;

  const handleQuickAdd = () => {
    if (!product.inStock) return;

    addToCart(product);
  };

  return (
    <article className="group">
      {/* Product image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="block h-full"
        >
          {/* Primary image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.tags?.includes("new") && (
            <Badge>
              New
            </Badge>
          )}

          {product.tags?.includes("bestseller") && (
            <Badge variant="primary">
              Bestseller
            </Badge>
          )}

          {hasSale && (
            <Badge variant="danger">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Badge
              variant="outline"
              size="md"
            >
              Out of Stock
            </Badge>
          </div>
        )}

        {/* Quick add */}
        {showQuickAdd && product.inStock && (
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium opacity-0 shadow-sm transition-all duration-300 hover:bg-black hover:text-white group-hover:opacity-100"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        )}
      </div>

      {/* Product information */}
      <Link
        to={`/product/${product.slug}`}
        className="mt-4 block"
      >
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-1 font-medium transition-colors group-hover:text-gray-600">
          {product.name}
        </h3>

        <div className="mt-1">
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
          />
        </div>
      </Link>
    </article>
  );
}