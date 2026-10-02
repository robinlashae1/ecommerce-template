import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItem as CartItemType } from "../types/ecommerce";
import { useCart } from "../hooks/useCart";
import { Price } from "./Price";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const {
    lineId,
    product,
    quantity,
    selectedVariants,
  } = item;

  const itemTotal = product.price * quantity;

  return (
    <article className="flex gap-4 border-b border-gray-200 py-6 sm:gap-6">
      {/* Image */}
      <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-32">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-gray-400">
              No image
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {product.category}
            </p>

            <h2 className="mt-1 truncate font-medium text-gray-950">
              {product.name}
            </h2>

            <div className="mt-2">
              <Price
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                size="sm"
              />
            </div>

            {/* Variants */}
            {selectedVariants &&
              Object.keys(selectedVariants).length > 0 && (
                <div className="mt-3 space-y-1">
                  {Object.entries(selectedVariants).map(
                    ([name, value]) => {
                      const variant = product.variants?.find(
                        (item) => item.id === name
                      );

                      const option = variant?.options.find(
                        (item) => item.value === value
                      );

                      return (
                        <p
                          key={name}
                          className="text-xs text-gray-500"
                        >
                          {variant?.name ?? name}:{" "}
                          {option?.label ?? value}
                        </p>
                      );
                    }
                  )}
                </div>
              )}
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => removeFromCart(lineId)}
            aria-label={`Remove ${product.name} from cart`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>

        {/* Bottom controls */}
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
              Quantity
            </p>

            <div className="flex w-fit items-center rounded-full border border-gray-300">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(lineId, quantity - 1)
                }
                disabled={quantity <= 1}
                aria-label={`Decrease quantity of ${product.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={14} />
              </button>

              <span
                className="w-8 text-center text-sm font-medium"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateQuantity(lineId, quantity + 1)
                }
                aria-label={`Increase quantity of ${product.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-950 sm:text-base">
            ${itemTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </article>
  );
}