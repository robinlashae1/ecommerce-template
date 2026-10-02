import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import type { Product } from "../../types/ecommerce";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/Button";

interface AddToCartProps {
  product: Product;
  className?: string;
}

export function AddToCart({
  product,
  className = "",
}: AddToCartProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] =
    useState<Record<string, string>>({});

  const hasVariants =
    product.variants && product.variants.length > 0;

  const handleQuantityDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((current) => current + 1);
  };

  const handleVariantChange = (
    name: string,
    value: string
  ) => {
    setSelectedVariants((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;

    addToCart(
      product,
      quantity,
      hasVariants ? selectedVariants : undefined
    );

    // Reset quantity after adding.
    setQuantity(1);
  };

  /*
   * Product is unavailable.
   */
  if (!product.inStock) {
    return (
      <div className={className}>
        <Button
          type="button"
          size="lg"
          disabled
          className="w-full"
        >
          Out of stock
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Variants */}
      {hasVariants && (
        <div className="space-y-5">
          {product.variants!.map((variant) => {
            const selectedValue =
              selectedVariants[variant.name];

            return (
              <div key={variant.id}>
                <label
                  htmlFor={`variant-${variant.id}`}
                  className="mb-2 block text-sm font-medium"
                >
                  {variant.name}
                </label>

                <select
                  id={`variant-${variant.id}`}
                  value={selectedValue ?? ""}
                  onChange={(event) =>
                    handleVariantChange(
                      variant.name,
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="">
                    Select {variant.name}
                  </option>

                  <option value={variant.value}>
                    {variant.value}
                  </option>
                </select>
              </div>
            );
          })}
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Quantity
        </label>

        <div className="inline-flex items-center rounded-full border border-gray-300">
          <button
            type="button"
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={16} />
          </button>

          <span
            aria-live="polite"
            className="w-10 text-center text-sm font-medium"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleQuantityIncrease}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <Button
        type="button"
        size="lg"
        onClick={handleAddToCart}
        className="w-full gap-2"
      >
        <ShoppingBag size={18} />
        Add to cart
      </Button>
    </div>
  );
}