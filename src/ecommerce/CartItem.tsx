import { Minus, Plus, Trash2 } from "lucide-react";
import { Price } from "./Price";
import type { CartItem as CartItemType } from "../types/ecommerce";
import { useCart } from "../hooks/useCart.ts";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const {
    updateQuantity,
    removeFromCart,
  } = useCart();

  const { product, quantity, selectedVariants } = item;

  const itemTotal = product.price * quantity;

  return (
    <div className="flex gap-4 border-b border-gray-200 py-6">
      {/* Product image */}
      <div className="h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-28">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product information */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium">
              {product.name}
            </h3>

            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
            />

            {/* Selected variants */}
            {selectedVariants &&
              Object.entries(selectedVariants).length > 0 && (
                <div className="mt-2 space-y-1">
                  {Object.entries(selectedVariants).map(
                    ([name, value]) => (
                      <p
                        key={name}
                        className="text-sm text-gray-500"
                      >
                        {name}: {value}
                      </p>
                    )
                  )}
                </div>
              )}
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            aria-label={`Remove ${product.name} from cart`}
            className="text-gray-400 transition-colors hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Bottom row */}
        <div className="mt-auto flex items-end justify-between pt-4">
          {/* Quantity controls */}
          <div className="flex items-center rounded-full border border-gray-300">
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  product.id,
                  quantity - 1
                )
              }
              aria-label={`Decrease quantity of ${product.name}`}
              disabled={quantity <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={15} />
            </button>

            <span
              className="w-8 text-center text-sm font-medium"
              aria-label={`Quantity: ${quantity}`}
            >
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  product.id,
                  quantity + 1
                )
              }
              aria-label={`Increase quantity of ${product.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Item total */}
          <p className="font-medium">
            ${itemTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}