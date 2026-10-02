import {
  ArrowRight,
  Check,
  LockKeyhole,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/Button";
import { CartItem } from "../ecommerce/CartItem";
import { useCart } from "../hooks/useCart";

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

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag
              size={32}
              className="text-gray-500"
            />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Your cart
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Looks like you haven't added anything to your cart
            yet.
          </p>

          <div className="mt-8">
            <Link to="/shop">
              <Button size="lg" className="w-full">
                Start Shopping
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Header */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Shopping bag
          </p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Your Cart
            </h1>

            <p className="text-sm text-gray-500">
              {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </section>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Items */}
          <div>
            <div className="border-t border-gray-200">
              {items.map((item) => (
                <CartItem
                  key={item.lineId}
                  item={item}
                />
              ))}
            </div>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              <ArrowRight
                size={16}
                className="rotate-180"
              />
              Continue shopping
            </Link>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-gray-50 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">
                      Discount
                    </span>

                    <span className="font-medium text-green-700">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium">
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {tax > 0 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-gray-500">
                      Tax
                    </span>

                    <span className="font-medium">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="my-6 border-t border-gray-200" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-semibold">
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
                  Proceed to Checkout
                  <ArrowRight
                    size={18}
                    className="ml-2"
                  />
                </Button>
              </Link>

              {/* Benefits */}
              <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <div className="flex gap-3">
                  <Truck
                    size={17}
                    className="mt-0.5 shrink-0 text-gray-500"
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    Free shipping on qualifying orders.
                  </p>
                </div>

                <div className="flex gap-3">
                  <LockKeyhole
                    size={17}
                    className="mt-0.5 shrink-0 text-gray-500"
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    Secure checkout and protected payments.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check
                    size={17}
                    className="mt-0.5 shrink-0 text-gray-500"
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    Easy returns on eligible products.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}