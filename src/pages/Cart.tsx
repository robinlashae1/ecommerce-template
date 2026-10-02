import { Link } from "react-router-dom";

import { CartItem } from "../ecommerce/CartItem";
import { Button } from "../ui/Button";
import { useCart } from "../hooks/useCart.ts";

export function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-4xl font-semibold">
          Your cart is empty
        </h1>

        <p className="mt-4 text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-block"
        >
          <Button>
            Continue Shopping
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold">
          Your Cart
        </h1>

        <p className="mt-2 text-gray-500">
          {itemCount}{" "}
          {itemCount === 1
            ? "item"
            : "items"}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* Cart items */}
        <div>
          {items.map((item) => (
            <CartItem
              key={item.lineId}
              item={item}
            />
          ))}
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-xl bg-gray-50 p-6">
          <h2 className="text-lg font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span>
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Discount
                </span>

                <span className="text-green-600">
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Shipping */}
            <div className="flex justify-between">
              <span className="text-gray-600">
                Shipping
              </span>

              <span>
                {shipping === 0
                  ? "Free"
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {/* Tax */}
            {tax > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Tax
                </span>

                <span>
                  ${tax.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="my-6 border-t border-gray-200" />

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block"
          >
            <Button
              size="lg"
              className="w-full"
            >
              Checkout
            </Button>
          </Link>
        </aside>
      </div>
    </main>
  );
}