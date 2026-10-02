import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "../types/ecommerce";
import { useCart } from "../hooks/useCart";
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
    <article className="group min-w-0">
      {/* Product image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="block h-full"
        >
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-gray-400">
                No image
              </span>
            </div>
          )}

          {/* Secondary image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex max-w-[80%] flex-wrap gap-2 sm:left-4 sm:top-4">
          {product.tags?.includes("new") && (
            <Badge>New</Badge>
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

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
            <Badge variant="outline" size="md">
              Out of Stock
            </Badge>
          </div>
        )}

        {/* Quick add */}
        {showQuickAdd && product.inStock && (
          <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
              className="flex w-full translate-y-2 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-black opacity-0 shadow-lg transition-all duration-300 hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Product information */}
      <Link
        to={`/product/${product.slug}`}
        className="mt-4 block"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {product.category}
            </p>

            <h3 className="mt-1 truncate font-medium text-gray-950 transition-colors group-hover:text-gray-600">
              {product.name}
            </h3>
          </div>

          {product.tags?.includes("new") && (
            <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-gray-400">
              New
            </span>
          )}
        </div>

        <div className="mt-2">
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