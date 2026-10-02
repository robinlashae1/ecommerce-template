import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

import type { Product } from "../types/ecommerce";
import { useCart } from "../hooks/useCart";
import { Button } from "../ui/Button";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({
  product,
}: AddToCartProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const [selectedVariants, setSelectedVariants] =
    useState<Record<string, string>>({});

  const hasVariants =
    product.variants && product.variants.length > 0;

 const allVariantsSelected =
  !hasVariants ||
  Boolean(
    product.variants?.every(
      (variant) => selectedVariants[variant.id]
    )
  );

  const handleVariantChange = (
    variantId: string,
    value: string
  ) => {
    setSelectedVariants((current) => ({
      ...current,
      [variantId]: value,
    }));
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    if (!product.inStock || !allVariantsSelected) {
      return;
    }

    addToCart(
      product,
      quantity,
      hasVariants ? selectedVariants : undefined
    );

    setQuantity(1);
  };

  if (!product.inStock) {
    return (
      <div className="space-y-3">
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled
        >
          Out of Stock
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product variants */}
      {hasVariants && (
        <div className="space-y-5">
          {product.variants?.map((variant) => (
            <div key={variant.id}>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium">
                  {variant.name}
                </label>

                {selectedVariants[variant.id] && (
                  <span className="text-sm text-gray-500">
                    {
                      variant.options.find(
                        (option) =>
                          option.value ===
                          selectedVariants[variant.id]
                      )?.label
                    }
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => {
                  const isSelected =
                    selectedVariants[variant.id] ===
                    option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        handleVariantChange(
                          variant.id,
                          option.value
                        )
                      }
                      aria-pressed={isSelected}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white hover:border-black",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="mb-3 block text-sm font-medium">
          Quantity
        </label>

        <div className="flex w-fit items-center rounded-full border border-gray-300">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={16} />
          </button>

          <span
            className="w-10 text-center text-sm font-medium"
            aria-live="polite"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Add button */}
      <div>
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={!allVariantsSelected}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={18} className="mr-2" />

          {!allVariantsSelected
            ? "Select Options"
            : "Add to Cart"}
        </Button>

        {hasVariants && !allVariantsSelected && (
          <p className="mt-2 text-center text-sm text-gray-500">
            Please select all options before adding to cart.
          </p>
        )}
      </div>
    </div>
  );
}